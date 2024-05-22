import Cuisine from './Cuisine';
import User from './User';
import Item from './Item';
import Menu from './Menu';
import Order from './Order';
import OrderItem from './OrderItem';
import OrderLog from './OrderLog';
import Product from './Product';
import Restaurant from './Restaurant';
import Review from './Review';
import ShortCode from './ShortCode';
import Option from './Option';
import UserAddress from './UserAddress';
import RestaurantAddress from './RestaurantAddress';
import PasswordResetRequest from './PasswordResetRequest';

console.log('Loading DB relations');

Review.belongsTo(Order, {
  as: 'order',
  foreignKey: 'orderId',
});

OrderItem.belongsTo(Order, {
  as: 'order',
  foreignKey: 'orderId',
});

OrderItem.belongsTo(Item, {
  as: 'item',
  foreignKey: 'itemId',
});

OrderLog.belongsTo(Order, {
  as: 'order',
  foreignKey: 'orderId',
});

OrderLog.belongsTo(Restaurant, {
  as: 'restaurant',
  foreignKey: 'restaurantId',
});

Order.belongsTo(User, {
  as: 'user',
  foreignKey: 'userId',
});

Order.belongsTo(Restaurant, {
  as: 'restaurant',
  foreignKey: 'restaurantId',
});

Order.hasOne(Review, {
  as: 'review',
  foreignKey: 'orderId',
});

Order.hasOne(OrderLog, {
  as: 'orderLog',
  foreignKey: 'orderId',
});

Order.hasMany(OrderItem, {
  as: 'orderItems',
  foreignKey: 'orderId',
});

User.belongsTo(ShortCode, {
  as: 'verificationShortCode',
  foreignKey: 'verificationShortCodeId',
});

User.belongsTo(UserAddress, {
  as: 'address',
  foreignKey: 'addressId',
});

User.hasMany(Order, {
  as: 'orders',
  foreignKey: 'userId',
});

UserAddress.hasOne(User, {
  as: 'user',
  foreignKey: 'addressId',
});

Restaurant.belongsTo(RestaurantAddress, {
  as: 'address',
  foreignKey: 'addressId',
});

Restaurant.hasMany(Item, {
  as: 'items',
  foreignKey: 'restaurantId',
});

Restaurant.hasMany(Order, {
  as: 'orders',
  foreignKey: 'restaurantId',
});

Restaurant.hasMany(OrderLog, {
  as: 'orderLogs',
  foreignKey: 'restaurantId',
});

RestaurantAddress.hasOne(Restaurant, {
  as: 'restaurant',
  foreignKey: 'addressId',
});

Item.belongsTo(Restaurant, {
  as: 'restaurant',
  foreignKey: 'restaurantId',
});

Item.belongsTo(Cuisine, {
  as: 'cuisine',
  foreignKey: 'cuisineId',
});

Item.belongsTo(Product, {
  as: 'product',
  foreignKey: 'productId',
});

Item.belongsTo(Menu, {
  as: 'menu',
  foreignKey: 'menuId',
});

Item.belongsTo(Option, {
  as: 'option',
  foreignKey: 'optionId',
});

Product.hasOne(Item, {
  as: 'item',
  foreignKey: 'productId',
});

Menu.hasOne(Item, {
  as: 'item',
  foreignKey: 'menuId',
});

PasswordResetRequest.belongsTo(User, {
  as: 'user',
  foreignKey: 'userId',
});

PasswordResetRequest.belongsTo(ShortCode, {
  as: 'passwordResetShortCode',
  foreignKey: 'passwordResetShortCodeId',
});
