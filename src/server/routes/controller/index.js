import signin from './signin';
import home from './home';
import about from './about';

export default (app, passport) => {
    app.use('/', signin(passport));
    app.use('/', home);
    app.use('/about', about);
}