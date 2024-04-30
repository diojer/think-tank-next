import { NextResponse } from "next/server";
import Reports from "@/app/models/Reports";
import validateReportsRequest from "./validation";
import createSlug from "@/lib/slug";

export async function GET(request, { params }) {
    try {
        const reports = await Reports.findAll();
        return NextResponse.json(reports, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error });
    }
}

export async function POST(request, { params }) {
    try {
        //validates report columns
        const report = await validateReportsRequest(request);

        //create readable slug
        report.slug = createSlug(report.title, 40);

        await Reports.create(report);
        return NextResponse.json(
            { message: "Uploaded successfully." },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function PUT(request, { params }) { }
