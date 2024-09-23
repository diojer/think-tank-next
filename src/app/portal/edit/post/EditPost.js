import React from "react";
import { getById } from "@/lib/routes";
import { EditForm } from "@/app/portal/edit/post/EditForm";
import { revalidateTag } from "next/cache";
import Posts from "@/app/models/Posts";


export default async function EditPost(type, id) {
    const record = await Posts.findOne({ where: { slug: id } });
    const post = record.toJSON();
    return <EditForm post={post} type={type} />;
}