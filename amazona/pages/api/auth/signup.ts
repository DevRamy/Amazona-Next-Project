import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import db from "../../../utils/db";
import bcryptjs from "bcryptjs";


export default async function handler (req : NextApiRequest, res : NextApiResponse) {

    if(req.method !== "POST"){
        return;
    }

    const {name, email, password} = req.body;

    if(!name || !email || !email.includes('@') || !password || password.trim().length < 8){
        res.status(422).json({message: 'Validation error'});
        return;
    }

    await db.connect();

    //@ts-ignore
    const isExistUser = await User.findOne({ email});

    if(isExistUser){
        res.status(422).json({message: 'User already exists!'});
        await db.disconnect();
        return;
    }

    const newUser = new User({
        name,
        email,
        password: bcryptjs.hashSync(password),
        isAdmin: false,
    });

    const user = newUser.save();

    await db.disconnect();

    res.status(201).json({
        message: 'Created user!',
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    });
}