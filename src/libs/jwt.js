import jwt from "jsonwebtoken";

export function createAccessToken(email) {
    return new Promise((resolve, reject) => {
        const payload = email;
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '2h' },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
}