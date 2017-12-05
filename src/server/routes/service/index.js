import category from './category';

export default app => {
    app.use('/rest/category', category);
}