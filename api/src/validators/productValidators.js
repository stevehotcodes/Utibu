import joi from 'joi'



export const productValidator=(product)=>{
    const prodcutSchema=joi.object({
        product_name:joi.string().required(),
        product_description:joi.string().required(),
        price:joi.string().required(),
        stock_quantity:joi.string().required()
    })

    return prodcutSchema.validate(product)
}