const passport = require('passport');
const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');
// Passport middlewares to use the existing strategies
passport.use(LocalStrategy);
passport.use(JwtStrategy);
