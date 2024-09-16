import jwt from "jsonwebtoken";
import { SECRET } from "../config/environments";

export const createJWT = async (payload: { id: number }) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, (err, token) => {
            if (err) {
                reject("Error while creating the token");
            }

            resolve(token);
        });
    });
};