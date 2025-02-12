const express = require('express')
const router = express.Router()
const User= require('../Model/UserModel')
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator')
const accountSid = process.env.Twilio_SID;
const authToken = process.env.Twilio_Token;
const serviceID= process.env.Twilio_Service_ID;
const client = require('twilio')(accountSid, authToken);


router.get('/profile', async (req, res) => {
    const userId = req.query.userId;
    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }
        return res.status(201).json({ success: true, user })

    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: error.message })
    }
})


router.put(
    "/profile/update",
    [
        body("userName", "Name must be at least 6 characters long").isLength({ min: 6 }),
        body(
            "newPassword",
            "Password must contain a minimum of 8 characters, including 1 uppercase, 1 lowercase, 1 number, and 1 special symbol."
        )
            .optional()
            .isStrongPassword({ minLength: 8 }),
    ],
    async (req, res) => {
        const { userId, userName, oldPassword, newPassword, profilePic } = req.body;

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ success: false, errorMessage: result.array(), body: req.body });
        }

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            const updateFields = {};

            // Password update logic
            if (oldPassword && newPassword) {
                const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
                if (!isPasswordMatch) {
                    return res.status(400).json({ success: false, message: "Old password is incorrect" });
                }

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);
                updateFields.password = hashedPassword;
            }

            // Update username if provided
            if (userName) {
                updateFields.userName = userName;
            }

            // Update profile picture if provided
            if (profilePic) {
                updateFields.profilePic = profilePic;
            }

            // Update user document
            await user.updateOne({ $set: updateFields });

          

            return res.status(201).json({ success: true, message: "Profile updated successfully" });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }
);


router.post('/send-otp',async(req,res)=>{
    try {
        const {phone}=req.body;
        
        const verification = await client.verify.v2.services(serviceID)
        .verifications
        .create({ to: phone, channel: 'sms' });
        
        res.status(201).json({ success: true, message: "OTP Sent Successfully", status: verification.status });

    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: "Failed to send OTP",error:error.message });
    }
})



router.post('/verify-otp', async (req, res) => {
    try {
        const { phone, otp } = req.body; // OTP is entered by the user

        const verification_check = await client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
            .verificationChecks
            .create({ to: phone, code: otp });

        if (verification_check.status === "approved") {
            res.status(201).json({ success: true, message: "OTP Verified Successfully" });
        } else {
            res.status(400).json({ success: false, message: "Invalid OTP or Expired OTP" });
        }

    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: "Failed to verify OTP", error: error.message });
    }
});



module.exports = router;
