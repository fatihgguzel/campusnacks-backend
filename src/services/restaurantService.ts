import Restaurant from '../database/models/Restaurant';
import RestaurantAddress from '../database/models/RestaurantAddress';
import sequelize from '../database/sequelize';
import { AppError } from '../errors/AppError';
import { Errors } from '../types/Errors';
import { toSlug, Logger } from '../helpers';
import * as Enums from '../types/enums';
import { uuid } from 'uuidv4';
import bcrypt from 'bcrypt';
import { getRestaurantContentResponse } from '../types/responseObjects';
import Product from '../database/models/Product';
import Item from '../database/models/Item';
import Menu from '../database/models/Menu';

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
    console.log(existingRestaurant.slug);
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
    restaurant.items.map((item) => {
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
    },
    attributes: ['id', 'name', 'hasDelivery', 'imageUrl', 'minimumPrice', 'deliveryTime', 'isBusy'],
    offset: options.offset,
    limit: options.limit,
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
    restaurant.items.map((item) => {
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
