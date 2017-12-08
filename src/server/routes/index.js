import rest from './rest';
import controller from './controller';

module.exports = function (app) {
  rest(app);
  controller(app);
};
