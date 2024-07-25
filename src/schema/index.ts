import { products } from "@/prisma/data/products";
import Email from "next-auth/providers/email";
import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string()
        .email('Email no Valido'),
    password: z.string()
        .min(6, 'Contraseña no Valida')
})

export const RegisterSchema = z.object({
    name: z.string()
      .min(1, 'Tu Nombre es Obligatorio'),
    email: z.string()
      .email('Email no Valido'),
    password: z.string()
      .min(6, 'Contraseña no Valida'),
      password_confirmation: z.string()
      .min(6, 'la confirmación de la Contraseña no Valida'),
  }).superRefine((data, ctx) => {
    if (data.password !== data.password_confirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Las contraseñas no coinciden",
        path: ["confirm_password"],
      });
    }
  });

export const UserSchema = z.object({
    name: z.string()
        .min(1, 'Tu Nombre es Obligatorio'),
    email: z.string()
        .email('Email no Valido'),
    password: z.string()
        .min(6, 'Contraseña no Valida'),
    role: z.enum(['admin', 'user'])
})

export const OrderSchema = z.object({
    name: z.string()
        .min(1, 'Tu Nombre es Obligatorio'),
    total: z.number()
        .min(1, 'Hay errores en la orden'),
    tableId: z.string(),
    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number()
    }))
})

export const SearchSchema = z.object({
    search: z.string()
        .trim()
        .min(1, { message: 'debes escribir algo' })
})

export const ProductSchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: 'El Nombre del Producto no puede ir vacio' }),
    price: z.string()
        .trim()
        .transform((value) => parseFloat(value))
        .refine((value) => value > 0, { message: 'Precio no válido' }) // convierte en numero
        .or(z.number().min(1, { message: 'La Categoría es Obligatoria' })),
    categoryId: z.string()
        .trim()
        .transform((value) => parseInt(value))
        .refine((value) => value > 0, { message: 'La Categoría es Obligatoria' })
        .or(z.number().min(1, { message: 'La Categoría es Obligatoria' })),
    image: z.string().min(1, { message: 'La imagen es obligatoria' })
})


export const BillOrderSchema = z.object({
    idBill: z.string().min(1, { message: "El número de factura no puede estar vacío" }),
    fecha: z.string().min(1, { message: "La fecha no puede estar vacía" }),
    nameBusiness: z.string().min(1, { message: "El nombre o razón social no puede estar vacío" }),
    nit: z.string().min(1, { message: "El NIT no puede estar vacío" }),
    address: z.string().min(1, { message: "La dirección no puede estar vacía" }),
    nameClient: z.string().min(1, { message: "El nombre del cliente no puede estar vacío" }),
    emailClient: z.string().email({ message: "Debe ser un correo electrónico válido" }),
    idClient: z.string().min(1, { message: "El ID del cliente no puede estar vacío" }),
    phoneClient: z.string().min(1, { message: "El teléfono no puede estar vacío" })
  });