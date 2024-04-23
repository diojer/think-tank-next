import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/upload";
import Posts from "@/app/models/Posts";

export async function GET(request, { params }) {
  try {
    const post = await Posts.findOne({ where: { slug: params.index } });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Post not found." }, { status: 500 });
  }
}

export async function POST(request, { params }) {}

export async function PUT(request, { params }) {}
