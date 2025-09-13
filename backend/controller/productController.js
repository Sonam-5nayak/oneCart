import uploadonCloudinary from "../config/cloudinary.js";
import Product from "../model/productModel.js";

export const addProduct = async (req, res) => {
    try {
        let { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        let image1 = await uploadonCloudinary(req.files.image1[0].path)
        let image2 = await uploadonCloudinary(req.files.image2[0].path)
        let image3 = await uploadonCloudinary(req.files.image3[0].path)
        let image4 = await uploadonCloudinary(req.files.image4[0].path)

        let productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true : false,
            date: Date.now(),
            image1,
            image2,
            image3,
            image4
        }

        const product = await Product.create(productData)
        return res.status(201).json(product)

    } catch (error) {
        console.log("AddProduct error")
        return res.status(500).json({ messege: `AddProduct error ${error}` })
    }
}


export const listProduct = async (req, res) => {
    try {
        const product = await Product.find({})
        return res.status(200).json(product)
    } catch (error) {
        console.log("ListProduct error")
        return res.status(500).json({ messege: `ListProduct error ${error}` })
    }
}

export const removeProduct = async (req, res) => {
    try {
        let { id } = req.params;
        const product = await Product.findByIdAndDelete(id)
        return res.status(200).json(product)
    } catch (error) {
        console.log("RemovetProduct error")
        return res.status(500).json({ messege: `RemoveProduct error ${error}` })
    }
}
