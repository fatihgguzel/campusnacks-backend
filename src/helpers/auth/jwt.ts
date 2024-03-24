import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import User from '../../database/models/User';
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

  const user = await User.findOne({
    where: {
      id: payload.id,
    },
  });

  if (!user) {
    return done(null, false);
  }

  if (!bcrypt.compareSync(user.jwtSecureCode, payload.jwtSecureCode)) {
    return done(null, false);
  }

  done(null, user as Express.User);
}

export default new Strategy(options, verify);
