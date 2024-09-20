import { sendVerificationEmail } from "@/Helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
    await dbConnect()
    try {
        const { username, email, password } = await request.json()
        const existingUserVerifiedByUsername = await UserModel.findOne({ username, isVerified: true })
        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            }, { status: 400 })
        }
        const existingUserByEmail = await UserModel.findOne({ email })

        if (existingUserByEmail) {
            //todo
        } else {
            const hash = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)
            new UserModel({
                username,
                email,
                password: hash,
                verifyCode,
                verifyCodeExpiry: Date,
                isVerified: boolean,
                isAcceptingMessage: boolean,
                messages: Message[]
            })
        }

    } catch (error) {
        console.error('error registering', error)
        return Response.json(
            {
                success: false,
                message: "error registering user "
            },
            {
                status: 500
            }
        )
    }
}