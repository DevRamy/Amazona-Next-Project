import {NextApiRequest, NextApiResponse} from "next";
import User from "../../models/Users";
import db from "../../utils/db";
import UserType from "../../utils/types/user";

export default async function handler (req : NextApiRequest, res : NextApiResponse) {

    await db.connect();

    const newUserData: UserType = {
        name: 'Ahmed Mohamed',
        email: 'ahmed@google.com',
        password: '12345141',
        isAdmin: false
    }

    const newUser: any = new User(newUserData);

    const createdUser = newUser.save();

    await db.disconnect();

    res.status(200).json({id: createdUser.id});
}
