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
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

export async function POST(request, { params }) {
  try {
    //validates image size, type, and post columns
    const [post, cardImage, bannerImage] = await validatePostsRequest(request);

    post.type = params.type;

    if (!cardImage || !bannerImage) {
      throw { message: "Two images required." };
    }

    const path = `posts/${post.type}/`;
    post.bannerImage = await uploadImage(bannerImage, path);
    post.cardImage = await uploadImage(cardImage, path);

    //create readable slug
    post.slug = createSlug(post.title, 30);

    await Posts.create(post);
    return NextResponse.json(
      { message: "Uploaded successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(request, { params }) {}
