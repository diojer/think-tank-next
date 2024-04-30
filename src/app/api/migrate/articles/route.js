import { NextResponse } from "next/server";
import Posts from "@/app/models/Posts";
import createSlug from "@/lib/slug";

export async function GET(request, { params }) {
    // try {
    //     const response = await fetch("https://api.leedsthinktank.org.uk/api/articles");
    //     const oldArticles = await response.json();
    //     let cleanedArticles = [];
    //     oldArticles.data.map((oldArticle) => {
    //         oldArticle.type = "article";
    //         oldArticle.slug = createSlug(oldArticle.title, 30);
    //         oldArticle.createdAt = oldArticle.created_at;
    //         oldArticle.updatedAt = oldArticle.updated_at;
    //         oldArticle.id = undefined;
    //         cleanedArticles.push(oldArticle);
    //     })

    //     await Posts.bulkCreate(cleanedArticles);
    //     return NextResponse.json("Articles Migrated", { status: 201 });
    // } catch (error) {
    //     return NextResponse.json(error, { status: 500 });
    // }
}