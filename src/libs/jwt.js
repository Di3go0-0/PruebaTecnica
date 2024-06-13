import jwt from "jsonwebtoken";

export function createAccessToken(id) {
    return new Promise((resolve, reject) => {
        const payload = {id};
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