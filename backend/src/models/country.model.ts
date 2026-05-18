import mongoose from "mongoose";

const CountrySchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    },
    countryName: {
        type: String,
        required: true
    }
});

export default mongoose.model('Country', CountrySchema);