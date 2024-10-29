import mongoose from "mongoose";

let isConnected: boolean = false

export const connectToDb = async (): Promise<void> => {
    mongoose.set("strictQuery", true)
    if (isConnected) {
        console.log("DB is connected already")
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL || "", {
            dbName: "wicked_whimsy_shop"
        })

        isConnected = true;
        console.log("Mongodb is connected!")
    } catch (error) {
        console.log(error)
    }
}