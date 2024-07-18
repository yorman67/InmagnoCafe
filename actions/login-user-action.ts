"use server"
import { prisma } from "@/src/lib/prisma"
import { LoginSchema } from "@/src/schema"
import { checkPassword } from "@/src/util";
import { generateJWT } from "@/src/util/jwt";

export async function loginUser(data: unknown) {

    const result = LoginSchema.safeParse(data);

    if (!result.success) {
        return {
            success: false,
            errors: result.error.issues
        };
    }

    const user = await prisma.user.findFirst({
        where: {
            email: result.data.email,
        },
    });


    if (!user) {
        return {
            success: false,
            error: 'Usuario no existe',
        };
    }

    const validPassword = await checkPassword(result.data.password, user.password) 

    if (!validPassword) {
        return {
            success: false,
            error: 'Usuario o contraseña incorrecta',
        };
    }

    const token = generateJWT( user.id );
   
    return {
        success: true,
        data: user,
        token
    };

}