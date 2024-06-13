import jwt from "jsonwebtoken";
import {JWT_SECRET} from '../config.js'

export function createAccessToken(_id, user) {
    return new Promise((resolve, reject) => {
        const payload = { _id, user };
        jwt.sign(
            payload,
            JWT_SECRET,
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
    
}