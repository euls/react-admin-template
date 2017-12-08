import login from './login';
import home from './home';
import about from './about';

export default app => {
    app.use('/login', login);
    app.use('/', home);
    app.use('/about', about);
}