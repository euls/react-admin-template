import controller from './controller';
import service from './service';

module.exports = function (app) {
  controller(app);
  service(app);
};
