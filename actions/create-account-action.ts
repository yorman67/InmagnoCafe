"use server"
import { prisma } from "@/src/lib/prisma";
import { RegisterSchema, UserSchema } from "@/src/schema";
import { hashPassword } from "@/src/util";

export async function createAccount(data: unknown) {

    const result = RegisterSchema.safeParse(data)

    if (!result.success) {  
        return {
            success: false,
            errors: result.error.issues
        }
    }

    const { email, password } = result.data;
    const userExist = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if (userExist) {
        return {
            error: 'El usuario ya existe'
        }
    }

    const user = {
        email,
        password,
        name: result.data.name
    }

    user.password = await hashPassword(password);

    await prisma.user.create({
        data: user
    })

    return {
        success: true,
        user: result.data,
        message: 'Cuenta creada con exito'
    }

}
