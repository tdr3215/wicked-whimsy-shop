/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectToDb } from "@/lib/db/mongoDb";
import { Collection } from "@/lib/models/Collection";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// POST 
export const POST = async (req: NextRequest) => {
    try {
        // CHECK USERID
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        // CONNECT TO DB
        await connectToDb()
        const { title, description, image } = await req.json()

        // CHECK EXISTING CONNECTION
        const existingConnection = await Collection.findOne({ title })
        if (existingConnection) {
            return new NextResponse("Collection already exists", { status: 400 })
        }

        if (!title || !image) {
            return new NextResponse("Title and image are required", { status: 400 })
        }

        const newCollection = await Collection.create({
            title,
            description,
            image,
        })

        await newCollection.save()
        return NextResponse.json(newCollection, { status: 201 })
    } catch (error) {
        console.log("[collections_POST]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export const GET = async (req: NextRequest) => {
    try {
        await connectToDb()
        const collections = await Collection.find().sort({ createdAt: "desc" })
        return NextResponse.json(collections, { status: 200 })
    } catch (error) {
        console.log("[collections_GET]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
