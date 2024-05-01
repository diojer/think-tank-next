import React from "react";
import EditPost from "@/app/portal/edit/post/EditPost";

export const dynamicParams = true

export default function EditArticle({ params }) {
    const type = "media-appearance";
    return EditPost(type, params.id);
}