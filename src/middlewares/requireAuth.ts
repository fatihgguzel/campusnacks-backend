import { passport } from '../helpers';

const requireJwt = passport.authenticate('jwtAuth', { session: false });

export { requireJwt };
