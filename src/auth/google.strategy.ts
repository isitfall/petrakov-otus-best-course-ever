import { googleEnv } from "../env";
import { User } from "../db/models/user.models";
import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import { generateJwtToken } from "../utils/jwt.utils";

passport.use(new GoogleStrategy({
        clientID: googleEnv.GOOGLE_CLIENT_ID,
        clientSecret: googleEnv.GOOGLE_CLIENT_SECRET,
        callbackURL: googleEnv.GOOGLE_REDIRECT_URI
    },
    async function(accessToken, refreshToken, profile, cb) {
        const userEmail = profile.emails?.[0]?.value;

        if (!userEmail) {
            return cb(null, undefined);
        }

        let user = await User.findOne({ email: userEmail });

        if (!user) {
            user = await User.create({
                username: profile.displayName,
                email: userEmail,
                provider: profile.provider
            });
        } else {
            user.username = profile.displayName;
            await user.save();
        }
        const token = generateJwtToken({ id: user._id, email: user.email });

        return cb(null, { user, token });
    }
));