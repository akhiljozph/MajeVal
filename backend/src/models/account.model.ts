import mongoose from "mongoose";
import bcrypt from "bcrypt";

const AccountSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    role: {
        type: String,
    },
});

AccountSchema.pre('save', async function () {
    const user = this;

    if (!user.isModified('password')) {
        return;
    }

    try {
        const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
        const salt = await bcrypt.genSalt(saltRounds);

        user.password = await bcrypt.hash(user.password, salt);
    } catch (error: any) {
        throw error;
    }
});

export default mongoose.model('Account', AccountSchema);