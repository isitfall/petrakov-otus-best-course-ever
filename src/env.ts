import { cleanEnv, str } from "envalid";
import { CleanOptions } from "envalid/src/types";
import dotenv from "dotenv";

dotenv.config();

const envFactory = <S>(specs: S, opts: CleanOptions<S> = {},) => cleanEnv(process.env, specs, opts)

export const googleEnv = envFactory({
    GOOGLE_CLIENT_ID: str({default:""}),
    GOOGLE_CLIENT_SECRET: str({default:""}),
    GOOGLE_REDIRECT_URI: str({default:"http://localhost:3000/auth/google/callback"}),
})

export const commonEnv = envFactory({
    SESSION_SECRET: str({default:""}),
    JWT_SECRET: str({default:""}),
    JWT_EXPIRES_IN: str({default:""}),
})