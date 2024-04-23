import { NextResponse } from "next/server";
import Mailinglist from "@/app/models/Mailinglist";
import validateMailingRequest from "./validation";

export async function GET(request, { parameters }) {
  try {
    const emails = await Mailinglist.findAll();
    return NextResponse.json(emails, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Error: ${error}` }, { status: 200 });
  }
}

export async function POST(request, { parameters }) {
  try {
    const email = await validateMailingRequest(request);
    await Mailinglist.create(email);
    return NextResponse.json({ message: "Email added.", status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Error: ${error.message}`, status: 500 });
  }
}
