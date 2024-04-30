import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/upload";
import Posts from "@/app/models/Posts";
import validatePostsRequest from "../validation";
import createSlug from "@/lib/slug";

export async function GET(request, { params }) {
  try {
    const posts = await Posts.findAll({
      where: {
        type: params.type,
      },
      order: [
        ["createdAt", "DESC"]
      ]
    });
    const header = request.headers;
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

export async function POST(request, { params }) {
  try {
    //validates post columns
    const post = await validatePostsRequest(request);

    //type should be article, media-appearance or press-release
    post.type = params.type;

    //create readable slug
    post.slug = createSlug(post.title, 30);

    await Posts.create(post);
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
