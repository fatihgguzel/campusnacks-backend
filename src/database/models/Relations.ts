import ShortCode from './ShortCode';
import Customer from './Customer';
import Address from './Address';
import PasswordResetRequest from './PasswordResetRequest';

console.log('Loading DB relations');

Customer.belongsTo(ShortCode, {
  as: 'verificationShortCode',
  foreignKey: 'verificationShortCodeId',
});

Customer.belongsTo(Address, {
  as: 'address',
  foreignKey: 'addressId',
});

PasswordResetRequest.belongsTo(Customer, {
  as: 'customer',
  foreignKey: 'customerId',
});

PasswordResetRequest.belongsTo(ShortCode, {
  as: 'passwordResetShortCode',
  foreignKey: 'passwordResetShortCodeId',
});
