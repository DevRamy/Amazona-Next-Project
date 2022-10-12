import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Order from "../../../models/Order";
import db from "../../../utils/db";

export default async function handler (req : NextApiRequest, res : NextApiResponse) {

    const session = await getSession({req});

    if(!session) {
        return res.status(401).send('signin required');
    }
    
    const { user } = session;

    console.log(session)

    await db.connect();

    const newOrder = new Order({
        ...req.body,
        // @ts-ignore
        user: user?._id,
    });

    const order = await newOrder.save();

    res.status(201).send(order);
}