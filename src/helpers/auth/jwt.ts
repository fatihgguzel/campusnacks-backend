import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import User from '../../database/models/User';
import bcrypt from 'bcrypt';
import Restaurant from '../../database/models/Restaurant';
import _ from 'lodash';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'secret-test',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function verify(payload: any, done: VerifiedCallback) {
  if (!payload?.id || !payload?.jwtSecureCode || !_.isBoolean(payload.isUser)) {
    return done(null, false);
  }

  if (payload.isUser) {
    const user = await User.findOne({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      return done(null, false);
    }

    if (user) {
      if (!bcrypt.compareSync(user.jwtSecureCode, payload.jwtSecureCode)) {
        return done(null, false);
      }

      done(null, user as Express.User);
    }
  } else {
    const restaurant = await Restaurant.findOne({
      where: {
        id: payload.id,
      },
    });

    if (!restaurant) {
      return done(null, false);
    }

    if (!bcrypt.compareSync(restaurant.jwtSecureCode, payload.jwtSecureCode)) {
      return done(null, false);
    }
    done(null, restaurant as Express.User);
  }
}

export default new Strategy(options, verify);
