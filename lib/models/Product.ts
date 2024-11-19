import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    title: {
        type: String,

    },
    description: String,
    media: [String],
    category: String,
    collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
    tags: [String],
    sizes: [String],
    colors: [String],
    price: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0.1,
        get: (v: mongoose.Schema.Types.Decimal128) => { return parseFloat(v.toString()) }
    },
    expense: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0.1,
        get: (v: mongoose.Schema.Types.Decimal128) => { return parseFloat(v.toString()) }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
}, { toJSON: { getters: true } })

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema)