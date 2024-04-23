import { NextResponse } from "next/server";
import Sponsors from "@/app/models/Sponsors";
import validateSponsorRequest from "./validation";
import { uploadImage } from "@/lib/upload";

export async function GET(request, { parameters }) {
  try {
    const sponsors = await Sponsors.findAll();
    return NextResponse.json(sponsors, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Bad Request" }, { status: 500 });
  }
}

export async function POST(request, { parameters }) {
  try {
    const [sponsor, image] = await validateSponsorRequest(request);

    if (!image) {
      throw { message: "Image required." };
    }

    const path = `sponsors/`;
    sponsor.image = await uploadImage(image, path);

    await Sponsors.create(sponsor);
    return NextResponse.json({ message: "Sponsor added." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
