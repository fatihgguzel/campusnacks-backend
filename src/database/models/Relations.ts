import Address from './Address';
import BusinessHour from './BusinessHour';
import Cuisine from './Cuisine';
import Customer from './Customer';
import Item from './Item';
import Menu from './Menu';
import MenuProduct from './MenuProduct';
import Order from './Order';
import OrderItem from './OrderItem';
import OrderLog from './OrderLog';
import Product from './Product';
import Restaurant from './Restaurant';
import Review from './Review';
import ShortCode from './ShortCode';
import Option from './Option';

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

Order.belongsTo(Customer, {
  as: 'customer',
  foreignKey: 'customerId',
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

Customer.belongsTo(ShortCode, {
  as: 'verificationShortCode',
  foreignKey: 'verificationShortCodeId',
});

Customer.belongsTo(Address, {
  as: 'address',
  foreignKey: 'addressId',
});

Customer.hasMany(Order, {
  as: 'orders',
  foreignKey: 'customerId',
});

ShortCode.hasOne(Customer, {
  as: 'customer',
  foreignKey: 'verificationShortCodeId',
});

Restaurant.belongsTo(Address, {
  as: 'address',
  foreignKey: 'addressId',
});

Restaurant.hasMany(BusinessHour, {
  as: 'businessHours',
  foreignKey: 'restaurantId',
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

BusinessHour.belongsTo(Restaurant, {
  as: 'restaurant',
  foreignKey: 'restaurantId',
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

Item.hasMany(OrderItem, {
  as: 'orderItems',
  foreignKey: 'itemId',
});

Option.hasOne(Item, {
  as: 'item',
  foreignKey: 'optiondId',
});

Cuisine.hasOne(Item, {
  as: 'item',
  foreignKey: 'cuisineId',
});

MenuProduct.belongsTo(Product, {
  as: 'product',
  foreignKey: 'productId',
});

MenuProduct.belongsTo(Menu, {
  as: 'menu',
  foreignKey: 'menuId',
});

Product.hasOne(Item, {
  as: 'item',
  foreignKey: 'productId',
});

Product.hasMany(MenuProduct, {
  as: 'menuProducts',
  foreignKey: 'productId',
});

Menu.hasOne(Item, {
  as: 'item',
  foreignKey: 'menuId',
});

Menu.hasMany(MenuProduct, {
  as: 'menuProducts',
  foreignKey: 'menuId',
});
