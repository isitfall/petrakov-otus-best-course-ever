import { verifyJwtToken } from "../utils/jwt.utils";

export const authenticateJWT = (
    // @ts-expect-error
    req, res, next
) => {
    if (req.path.startsWith('/auth')) {
        return next();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyJwtToken(token);

    if (!decoded) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    (req as any).user = decoded;
    next();
};