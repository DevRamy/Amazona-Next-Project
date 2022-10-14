import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Order from "../../../models/Order";
import db from "../../../utils/db";

export default async function handler (req : NextApiRequest, res : NextApiResponse) {

    const session = await getSession({req});

    if(!session) {
        res.status(401).send('signin required');
    }

    await db.connect();

    //@ts-ignore
    const order = await Order.findById(req.query.id);

    await db.disconnect();

    res.status(200).send(order);
}