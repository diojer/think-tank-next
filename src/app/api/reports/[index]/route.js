import { NextResponse } from "next/server";
import Reports from "@/app/models/Reports";

export async function GET(request, { params }) {
    try {
        const report = await Reports.findOne({ where: { slug: params.index } });
        return NextResponse.json(report, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Report not found." }, { status: 500 });
    }
}