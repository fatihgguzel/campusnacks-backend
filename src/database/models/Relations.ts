import ShortCode from './ShortCode';
import Customer from './Customer';
import Restaurant from './Restaurant';
import Address from './Address';
import BusinessHour from './BusinessHour';

console.log('Loading DB relations');

Customer.belongsTo(ShortCode, {
  as: 'verificationShortCode',
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
