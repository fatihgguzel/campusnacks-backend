import Restaurant from '../database/models/Restaurant';
import RestaurantAddress from '../database/models/RestaurantAddress';
import sequelize from '../database/sequelize';
import { AppError } from '../errors/AppError';
import { Errors } from '../types/Errors';
import { toSlug, Logger } from '../helpers';
import * as Enums from '../types/enums';
import { uuid } from 'uuidv4';
import bcrypt from 'bcrypt';
import { getRestaurantContentResponse, getRestaurantOrdersResponse } from '../types/responseObjects';
import Product from '../database/models/Product';
import Item from '../database/models/Item';
import Menu from '../database/models/Menu';
import Order from '../database/models/Order';
import OrderItem from '../database/models/OrderItem';
import { Op } from 'sequelize';
import moment from 'moment';
import User from '../database/models/User';
import UserAddress from '../database/models/UserAddress';

interface ICreateRestaurantOptions {
  name: string;
  phone: string;
  email: string;
  imageUrl?: string;
  city: string;
  district: string;
  address: string;
  nHood: string;
  street: string;
  no: string;
  campus: Enums.Campuses;
  password: string;
}
export async function createRestaurant(options: ICreateRestaurantOptions) {
  const restaurantAddress = [options.name, options.nHood, options.street, options.no].join(' ');
  const restaurantSlug = toSlug(restaurantAddress);

  const existingRestaurant = await Restaurant.findOne({
    where: {
      slug: restaurantSlug,
    },
  });

  if (existingRestaurant) {
    throw new AppError(Errors.RESTAURANT_EXIST, 400);
  }

  const restaurant = await sequelize.transaction(async (transaction) => {
    const address = await RestaurantAddress.create(
      {
        city: options.city,
        district: options.district,
        address: options.address,
        nHood: options.nHood,
        street: options.street,
        no: options.no,
      },
      {
        transaction,
      },
    );
    const restaurant = await Restaurant.create(
      {
        name: options.name,
        phone: options.phone,
        email: options.email,
        addressId: address.id,
        imageUrl: options.imageUrl || null,
        hasDelivery: true,
        minimumPrice: 0,
        deliveryTime: 0,
        isOpen: true,
        isBusy: false,
        slug: restaurantSlug,
        hashPassword: bcrypt.hashSync(options.password, bcrypt.genSaltSync(10)),
        campus: options.campus,
        jwtSecureCode: uuid(),
      },
      {
        transaction,
      },
    );
    return restaurant;
  });

  await Logger.log({
    service: 'restaurantService',
    function: 'createRestaurant',
    message: 'restaurant created',
    data: {
      ...options,
    },
  });

  return restaurant;
}

interface IUpdateRestaurantOptions {
  restaurantId: number;
  phone?: string;
  imageUrl?: string | null;
  hasDelivery?: boolean;
  deliveryPrice?: number | null;
  minimumPrice?: number;
  deliveryTime?: number;
  isBusy?: boolean;
  city?: string;
  district?: string;
  address?: string;
  nHood?: string;
  street?: string;
  no?: string;
  isOpen?: boolean;
}
export async function updateRestaurant(options: IUpdateRestaurantOptions) {
  const existingRestaurant = await Restaurant.findOne({
    where: {
      id: options.restaurantId,
    },
  });

  if (!existingRestaurant) {
    throw new AppError(Errors.RESTAURANT_NOT_FOUND, 404);
  }

  await existingRestaurant.update({
    ...options,
  });
}

interface IDeleteRestaurantOptions {
  restaurantId: number;
}
export async function deleteRestaurant(options: IDeleteRestaurantOptions) {
  const restaurant = await Restaurant.findOne({
    where: {
      id: options.restaurantId,
    },
  });

  if (!restaurant) {
    throw new AppError(Errors.RESTAURANT_NOT_FOUND);
  }

  await restaurant.destroy();

  await Logger.log({
    service: 'restaurantService',
    function: 'deleteRestaurant',
    message: 'restaurant deleted',
    data: {
      ...options,
    },
  });
}

interface IGetRestaurantDetailsOptions {
  restaurantId: number;
}
export async function getRestaurantDetails(options: IGetRestaurantDetailsOptions) {
  const restaurant = await Restaurant.findOne({
    where: {
      id: options.restaurantId,
    },
    attributes: [
      'id',
      'name',
      'phone',
      'email',
      'imageUrl',
      'hasDelivery',
      'deliveryPrice',
      'minimumPrice',
      'deliveryTime',
      'isBusy',
      'isOpen',
      'slug',
      'campus',
    ],
    include: [
      {
        model: RestaurantAddress,
        as: 'address',
        attributes: ['id', 'city', 'district', 'address', 'nHood', 'street'],
      },
      {
        model: Item,
        as: 'items',
        include: [
          {
            model: Product,
            as: 'product',
          },
          {
            model: Menu,
            as: 'menu',
          },
        ],
      },
    ],
    order: [[{ model: Item, as: 'items' }, 'price', 'DESC']],
  });

  const items = [];

  if (restaurant?.items?.length) {
    restaurant.items.forEach((item) => {
      items.push({
        id: item.id,
        restaurantId: item.restaurantId,
        hasDiscount: item.hasDiscount,
        discount: item.discount,
        name: item.name,
        description: item.description,
        imageUrl: item.imageUrl,
        price: item.price,
        ...(item.menu
          ? {
              menu: {
                id: item.menu.id,
                hasBadge: item.menu.hasBadge,
                badgeTag: item.menu.badgeTag,
              },
            }
          : {
              product: {
                id: item.product!.id,
                productType: item.product!.productType,
              },
            }),
      });
    });
  }

  return { restaurant };
}

interface IGetRestaurantsOptions {
  limit: number;
  offset: number;
  campus: Enums.Campuses;
}
export async function getRestaurants(options: IGetRestaurantsOptions) {
  const { count, rows } = await Restaurant.findAndCountAll({
    where: {
      campus: options.campus,
      isOpen: true,
    },
    attributes: ['id', 'name', 'hasDelivery', 'imageUrl', 'minimumPrice', 'deliveryTime', 'isBusy'],
    offset: options.offset,
    limit: options.limit,
    order: [['createdAt', 'ASC']],
  });

  return { totalCount: count, restaurants: rows };
}

interface IGetRestaurantContentOptions {
  restaurantId: number;
}
export async function getRestaurantContent(options: IGetRestaurantContentOptions) {
  const restaurant = await Restaurant.findOne({
    where: {
      id: options.restaurantId,
    },
    include: [
      {
        model: Item,
        as: 'items',
        include: [
          {
            model: Product,
            as: 'product',
          },
          {
            model: Menu,
            as: 'menu',
          },
        ],
      },
    ],
    order: [[{ model: Item, as: 'items' }, 'price', 'DESC']],
  });

  if (!restaurant) {
    throw new AppError(Errors.RESTAURANT_NOT_FOUND, 404);
  }

  const response: getRestaurantContentResponse['data'] = {
    restaurantInfo: {
      id: restaurant.id,
      name: restaurant.name,
      isOpen: restaurant.isOpen,
      hasDelivery: restaurant.hasDelivery,
      minimumPrice: restaurant.minimumPrice,
      imageUrl: restaurant.imageUrl,
      deliveryPrice: restaurant.deliveryPrice,
    },
    items: [],
  };

  if (restaurant.items?.length) {
    restaurant.items.forEach((item) => {
      response.items.push({
        id: item.id,
        restaurantId: item.restaurantId,
        hasDiscount: item.hasDiscount,
        discount: item.discount,
        name: item.name,
        description: item.description,
        imageUrl: item.imageUrl,
        price: item.price,
        ...(item.menu
          ? {
              menu: {
                id: item.menu.id,
                hasBadge: item.menu.hasBadge,
                badgeTag: item.menu.badgeTag,
              },
            }
          : {
              product: {
                id: item.product!.id,
                productType: item.product!.productType,
              },
            }),
      });
    });
  }

  return response;
}

interface IAddItemOptions {
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  itemType: Enums.ItemTypes;
  imageUrl: string | null;
}
export async function addItem(options: IAddItemOptions) {
  const restaurant = await Restaurant.findOne({
    where: {
      id: options.restaurantId,
    },
  });

  if (!restaurant) {
    throw new AppError(Errors.RESTAURANT_NOT_FOUND, 404);
  }

  switch (options.itemType) {
    case Enums.ItemTypes.PRODUCT:
      const itemProduct = await Product.create({
        productType: Enums.ProductTypes.EDIBLE,
      });

      await Item.create({
        hasDiscount: false,
        discount: null,
        name: options.name,
        description: options.description,
        imageUrl: options.imageUrl,
        price: options.price,
        restaurantId: options.restaurantId,
        cuisineId: 1,
        productId: itemProduct.id,
        optionId: null,
        menuId: null,
      });

      break;
    case Enums.ItemTypes.MENU:
      const itemMenu = await Menu.create({
        hasBadge: false,
        badgeTag: null,
      });

      await Item.create({
        hasDiscount: false,
        discount: null,
        name: options.name,
        description: options.description,
        imageUrl: options.imageUrl,
        price: options.price,
        restaurantId: options.restaurantId,
        cuisineId: 1,
        productId: null,
        optionId: null,
        menuId: itemMenu.id,
      });

      break;
  }
}

interface IGetRestaurantOrdersOptions {
  restaurantId: number;
  getActiveOrders: boolean;
  limit: number;
  offset: number;
}
export async function getRestaurantOrders(options: IGetRestaurantOrdersOptions) {
  const restaurant = await Restaurant.findOne({
    where: {
      id: options.restaurantId,
    },
  });

  if (!restaurant) {
    throw new AppError(Errors.RESTAURANT_NOT_FOUND, 404);
  }

  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const { count, rows } = await Order.findAndCountAll({
    where: {
      restaurantId: options.restaurantId,
      ...(options.getActiveOrders
        ? {
            orderDate: {
              [Op.gte]: twentyFourHoursAgo,
            },
            [Op.or]: [{ status: Enums.OrderStatusTypes.PENDING }, { status: Enums.OrderStatusTypes.ONDELIVER }],
          }
        : {}),
    },
    include: [
      {
        model: OrderItem,
        as: 'orderItems',
        include: [
          {
            model: Item,
            as: 'item',
          },
        ],
      },
    ],
    offset: options.offset,
    limit: options.limit,
    order: [['createdAt', 'DESC']],
  });

  const orderIdsToUpdate = rows
    .filter(
      (order) =>
        moment(order.orderDate).isBefore(twentyFourHoursAgo) &&
        order.status !== Enums.OrderStatusTypes.COMPLETED &&
        order.status !== Enums.OrderStatusTypes.CANCELLED,
    )
    .map((order) => order.id);

  if (orderIdsToUpdate.length) {
    await Order.update(
      { status: Enums.OrderStatusTypes.CANCELLED },
      {
        where: {
          id: { [Op.in]: orderIdsToUpdate },
        },
      },
    );
  }

  const ordersResponse: getRestaurantOrdersResponse['data'] = {
    orders: [],
    totalCount: count,
  };

  rows.forEach((order) => {
    ordersResponse.orders.push({
      id: order.id,
      restaurantId: order.restaurantId,
      userId: order.userId,
      // if 24 hours before, update as CANCELLED
      status:
        moment(order.orderDate).isBefore(twentyFourHoursAgo) &&
        order.status !== Enums.OrderStatusTypes.COMPLETED &&
        order.status !== Enums.OrderStatusTypes.CANCELLED
          ? Enums.OrderStatusTypes.CANCELLED
          : order.status,
      deliveredDate: order.deliveredDate,
      orderDate: order.orderDate,
      deliveryType: order.deliveryType,
      cost: order.orderItems!.reduce((sum, orderItem) => sum + orderItem.item!.price * orderItem.count, 0),
    });
  });

  return ordersResponse;
}

interface ICreateOrderOptions {
  userId: number;
  restaurantId: number;
  items: { itemId: number; count: number }[];
}
export async function createOrder(options: ICreateOrderOptions) {
  const restaurant = await Restaurant.findOne({
    where: {
      id: options.restaurantId,
      isOpen: true,
    },
  });

  if (!restaurant) {
    throw new AppError(Errors.RESTAURANT_NOT_FOUND, 404);
  }

  const items = await Item.findAll({
    where: {
      id: {
        [Op.in]: options.items.map((item) => {
          return item.itemId;
        }),
      },
      restaurantId: options.restaurantId,
    },
  });

  if (items.length !== options.items.length) {
    throw new AppError(Errors.ITEM_NOT_FOUND, 404);
  }

  await sequelize.transaction(async (transaction) => {
    const order = await Order.create(
      {
        userId: options.userId,
        restaurantId: options.restaurantId,
        status: Enums.OrderStatusTypes.PENDING,
        orderDate: moment().toDate(),
        deliveredDate: null,
        deliveryType: Enums.DeliveryTypes.DELIVERY,
      },
      { transaction },
    );

    await OrderItem.bulkCreate(
      options.items.map((item) => {
        return {
          itemId: item.itemId,
          orderId: order.id,
          count: item.count,
        };
      }),
      { transaction },
    );
  });
}

interface IUpdateOrderOptions {
  restaurantId: number;
  orderStatus: Enums.OrderStatusTypes;
  orderId: number;
}
export async function updateOrder(options: IUpdateOrderOptions) {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const order = await Order.findOne({
    where: {
      id: options.orderId,
      restaurantId: options.restaurantId,
      orderDate: { [Op.gte]: twentyFourHoursAgo },
    },
  });

  if (!order) {
    throw new AppError(Errors.ORDER_NOT_FOUND, 404);
  }

  await order.update({ status: options.orderStatus });
}

interface IGetOrderDetailsOptions {
  orderId: number;
}
export async function getOrderDetails(options: IGetOrderDetailsOptions) {
  const order = await Order.findOne({
    where: {
      id: options.orderId,
    },
    attributes: ['id'],
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'fullName', 'phoneNumber'],
        include: [
          {
            model: UserAddress,
            as: 'address',
            attributes: ['id', 'city', 'district', 'address'],
          },
        ],
      },
      {
        model: OrderItem,
        as: 'orderItems',
        attributes: ['id', 'count'],
        include: [
          {
            model: Item,
            as: 'item',
            attributes: ['id', 'name', 'price'],
          },
        ],
      },
    ],
  });

  return order;
}

interface IEditItemOptions {
  restaurantId: number;
  itemId: number;
  name?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
}
export async function editItem(options: IEditItemOptions) {
  const item = await Item.findOne({
    where: {
      id: options.itemId,
      restaurantId: options.restaurantId,
    },
  });

  if (!item) {
    throw new AppError(Errors.ITEM_NOT_FOUND, 404);
  }

  await item.update(options);
}

interface IDeleteItemOptions {
  restaurantId: number;
  itemId: number;
}
export async function deleteItem(options: IDeleteItemOptions) {
  const item = await Item.findOne({
    where: {
      id: options.itemId,
      restaurantId: options.restaurantId,
    },
  });

  if (!item) {
    throw new AppError(Errors.ITEM_NOT_FOUND, 404);
  }

  await item.destroy();
}
