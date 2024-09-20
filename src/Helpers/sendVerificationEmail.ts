import { resend } from "@/lib/resend"
import { ApiResponse } from "@/types/ApiResponse"
import VerificationEmail from "../../emails/VerificationEmail"
export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: "nboarding@resend.dev",
            to: email,
            subject: "Verification code",
            react: VerificationEmail({ username, otp: verifyCode }),
        })
        return { success: true, message: " Verification email sent" }

    } catch (error) {
        console.error("error", error)
        return { success: false, message: "Failed to send verification email" }
    }
}
