import passport from 'passport';
import session from 'express-session';
import LocalStrategy from 'passport-local';
import flash from 'connect-flash';

export default server => {
    server.use(session({
        secret: 'securetKey',
        resave: true,
        saveUninitialized: true
    }));
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(flash());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        done(null, {
            id: id
        })
    });

    passport.use('local', new LocalStrategy({
        passReqToCallback: true
    }, (req, username, password, done) => {
        if ('root' !== username) {
            return done(null, false, req.flash('message', 'User Not found.'));
        }

        return done(null, {
            id: 0,
            username: username
        })
    }));

    return passport;
}