import demo from './demo';

export default app => {
    app.use('/rest', demo);
}