import mongoose from "mongoose"
const collectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true

    },
    description: String,
    image: {
        type: String,
        required: true
    },
    products: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Product"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

export const Collection = mongoose.models.Collection || mongoose.model("Collection", collectionSchema)