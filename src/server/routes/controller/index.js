import home from './home';
import about from './about';

export default app => {
    // app.use('/', home);
    app.use('/about', about);
}