import Restaurant from '../database/models/Restaurant';
import RestaurantAddress from '../database/models/RestaurantAddress';
import sequelize from '../database/sequelize';
import { AppError } from '../errors/AppError';
import { Errors } from '../types/Errors';
import { toSlug, Logger } from '../helpers';
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
        isBusy: false,
        slug: restaurantSlug,
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
    ],
  });

  return { restaurant };
}
