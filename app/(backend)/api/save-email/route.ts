import { NextRequest, NextResponse } from "next/server";
import mongoose, { Schema, Model, Document } from "mongoose";
import { z } from "zod";
import { connectToDatabase } from "../../../lib/db";
// ==============================
// Zod Validation Schema
// ==============================

const EmailSignupValidationSchema = z.object({
    name: z.string().min(1, "Name is required").trim(),

    email: z.string().email("Invalid email format").trim().toLowerCase(),
});

// Optional: inferred type from Zod
type EmailSignupInput = z.infer<typeof EmailSignupValidationSchema>;

// ==============================
// Mongoose Type Definition
// ==============================

interface IEmailSignup extends Document {
    name: string;
    email: string;
    createdAt: Date;
}

// ==============================
// Mongoose Schema
// ==============================

const emailSignupSchema = new Schema<IEmailSignup>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: false }
);

// ==============================
// Model (Properly Typed)
// ==============================

const EmailSignup: Model<IEmailSignup> =
    (mongoose.models.EmailSignup as Model<IEmailSignup>) ||
    mongoose.model<IEmailSignup>("EmailSignup", emailSignupSchema);

// ==============================
// POST Handler
// ==============================

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();

        const body = await request.json();

        // 🔥 Zod Validation
        const parsed = EmailSignupValidationSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    error: parsed.error.issues[0].message,
                },
                { status: 400 }
            );
        }

        // Cleaned & validated data
        const { name, email }: EmailSignupInput = parsed.data;

        const existingSignup = await EmailSignup.findOne({ email });

        if (existingSignup) {
            return NextResponse.json(
                { error: "This email is already registered" },
                { status: 409 }
            );
        }

        const newSignup = await EmailSignup.create({
            name,
            email,
            createdAt: new Date(),
        });

        return NextResponse.json(
            {
                message: "Successfully saved to Founding Shawlyf Circle",
                data: {
                    _id: newSignup._id,
                    name: newSignup.name,
                    email: newSignup.email,
                    createdAt: newSignup.createdAt,
                },
            },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error("API Error:", error);

        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            (error as { code?: number }).code === 11000
        ) {
            return NextResponse.json(
                { error: "This email is already registered" },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: "Failed to save email. Please try again." },
            { status: 500 }
        );
    }
}
