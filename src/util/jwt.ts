import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

export const generateJWT = (payload: number) => {
    return jwt.sign({ payload }, process.env.JWT_SECRET!, {
        expiresIn: "30d",
    });
}

export const authenticate = async (token: string) => {

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)

        if(typeof decoded === 'object' && decoded.payload.id) {
            const user =  await prisma.user.findUnique({
                where: {
                    id: decoded.payload.id
                }
            })

            if(user) {
                return {
                    success: true,
                    data: user
                }
            }else{
                return {
                   success: false,
                   error: 'no autorizado'
                }
                
            }
        }
       
    } catch (error) {
        return {
            error: 'Hubo un error'
        }
    }
}