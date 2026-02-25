import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || '';

let isConnected = false;

async function connectToDatabase() {
    if (isConnected) {
        return;
    }

    if (!MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined in environment variables');
    }

    try {
        await mongoose.connect(MONGODB_URI);
        isConnected = true;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

// Define the schema for the email signup
const emailSignupSchema = new mongoose.Schema(
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

// Create or get the model
const EmailSignup = mongoose.models.EmailSignup || mongoose.model('EmailSignup', emailSignupSchema);

export async function POST(request: NextRequest) {
    try {
        // Connect to database
        await connectToDatabase();

        // Parse request body
        const body = await request.json();
        const { name, email } = body;

        // Validate input
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and email are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Check if email already exists
        const existingSignup = await EmailSignup.findOne({ email });
        if (existingSignup) {
            return NextResponse.json(
                { error: 'This email is already registered' },
                { status: 409 }
            );
        }

        // Create new document
        const newSignup = await EmailSignup.create({
            name,
            email,
            createdAt: new Date(),
        });

        return NextResponse.json(
            {
                message: 'Successfully saved to Founding Shawlyf Circle',
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
