import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import Customer from '../../database/models/Customer';
import bcrypt from 'bcrypt';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'secret-test',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function verify(payload: any, done: VerifiedCallback) {
  if (!payload?.id || !payload?.jwtSecureCode) {
    return done(null, false);
  }

  const customer = await Customer.findOne({
    where: {
      id: payload.id,
    },
  });

  if (!customer) {
    return done(null, false);
  }

  if (!bcrypt.compareSync(customer.jwtSecureCode, payload.jwtSecureCode)) {
    return done(null, false);
  }

  done(null, customer as Express.User);
}

export default new Strategy(options, verify);
