/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectToDb } from "@/lib/db/mongoDb";
import { Collection } from "@/lib/models/Collection";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// GET
export const GET = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
    try {
        await connectToDb()
        const collection = await Collection.findById(params.collectionId)
        console.log(collection)

        if (!collection) {
            return new NextResponse(JSON.stringify({ message: "Collection not found!" }), { status: 400 })
        }

        return NextResponse.json(collection, { status: 200 })


    } catch (error) {
        console.log("[collectionId_GET]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

// POST 
export const POST = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
    try {
        const userId = auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        await connectToDb()
        let collection = await Collection.findById(params.collectionId)
        if (!collection) {
            return new NextResponse("Collection not found!", { status: 404 })
        }

        const { title, description, image } = await req.json()
        if (!title || !image) {
            return new NextResponse("Must include title and image", { status: 400 })
        }

        collection = await Collection.findByIdAndUpdate(params.collectionId, { title, description, image }, { new: true })
        return NextResponse.json(collection, { status: 200 })
    } catch (error) {
        console.log("[collectionId_POST]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
// DELETE
export const DELETE = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {


    try {
        const userId = auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        await connectToDb()
        await Collection.findByIdAndDelete(params.collectionId)
        return new NextResponse("Collection is deleted!", { status: 200 })

    } catch (error) {
        console.log("[collectionId_DELETE]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}