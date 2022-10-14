import {NextApiRequest, NextApiResponse} from "next";
import User from "../../models/User";
import db from "../../utils/db";
import products from "../../utils/data";
import Product from "../../models/Product";

export default async function handler (req : NextApiRequest, res : NextApiResponse) {

    await db.connect();

    await Product.deleteMany();
    //@ts-ignore
    await Product.insertMany(products.products);

    await db.disconnect();

    res.status(200).json("seeded successfully");
}
