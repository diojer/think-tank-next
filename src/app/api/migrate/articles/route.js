import { NextResponse } from "next/server";
import Posts from "@/app/models/Posts";
import createSlug from "@/lib/slug";

export async function GET(request, { params }) {
    const response = await fetch("https://api.leedsthinktank.org.uk/api/articles");
    const oldArticles = await response.json();
    let cleanedArticles = [];
    oldArticles.data.map((oldArticle) => {
        oldArticle.type = "article";
        oldArticle.slug = createSlug(oldArticle.title, 30);
        cleanedArticles.push(oldArticle);
    })

    return NextResponse.json(cleanedArticles, { status: 201 });
}