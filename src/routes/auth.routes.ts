import { Router } from 'express';
import passport from 'passport';
import { authenticateJWT } from "../middlewares/auth.moddleware";

export const authRoutes = Router();

authRoutes.get("/login", (req, res) => {
    res.send("<a href='/auth/google'>Authenticate with Google!</a>");
})

authRoutes.get('/auth/success', authenticateJWT, (req, res) => {
    res.send("<p >You successfully sign in</p>");
})

authRoutes.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRoutes.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    (req, res) => {
        res.json({user: req.user}).status(200);
    });
