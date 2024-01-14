import passport from 'passport';
import jwt from './jwt';

passport.use('jwtAuth', jwt);

export default passport;
