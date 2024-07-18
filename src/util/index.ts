import bcrypt from 'bcryptjs-react'

export function formatCurrency(number: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(number);
}

export function getImagePath(imagePath: string) {
   const cloudinaryUrl = 'https://res.cloudinary.com'
   if (imagePath.startsWith(cloudinaryUrl)) {
       return imagePath
   }else{
       return `/products/${imagePath}.jpg`
   }
}

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hashSync(password, salt)
}

export const checkPassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash)
}


