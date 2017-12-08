import rest from './rest';
import controller from './controller';

module.exports = function (app, passport) {
  rest(app);
  controller(app, passport);
};
