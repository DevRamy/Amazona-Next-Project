import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../models/Product";
import db from "../../../utils/db";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {

    await db.connect();
    //@ts-ignore
    const product = await Product.findById(req.query.id);
    await db.disconnect();
    res.status(200).send(product);
}