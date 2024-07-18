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