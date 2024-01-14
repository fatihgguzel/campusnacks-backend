import ShortCode from './ShortCode';
import Customer from './Customer';

console.log('Loading DB relations');

Customer.belongsTo(ShortCode, {
  as: 'verificationShortCode',
  foreignKey: 'verificationShortCodeId',
});
