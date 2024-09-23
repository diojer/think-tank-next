import React from "react";
// import { useState, useEffect } from "react";
import { Button } from "@/components/Button";
// import "./ViewArticles.css";
import "../View.css";
import { Link } from "next/link";
import { index, remove } from "@/lib/routes";
import { revalidateTag } from "next/cache";

async function ViewPosts(type, path) {
    revalidateTag("/posts/article");
    const posts = await index(`/posts/${type}`);
    //sorting function

    // function articleDelete(article) {
    //     if (!window.confirm("Are you sure you want to delete this article?")) {
    //         return;
    //     } else {
    //         remove(`posts/article/`, article.id);
    //     }
    // }

    function capitaliseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //just some nice tidying
    const title = ((type) => {
        const array = type.split("-");
        let title = "";
        array.map((wordlet) => {
            title = title + capitaliseFirstLetter(wordlet) + " ";
        })
        title = title.trimEnd();
        title = title + "s";
        return title;
    })(type)


    return (
        <>
            <div className="article-view-wrapper upload-subwrapper">
                <p className="article-view-heading upload-subheader">
                    View/Edit {title}
                </p>
                <table className="default-table">
                    <tbody>
                        <tr className="default-table-headings">
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Subject</th>
                            <th>Banner Image</th>
                            <th>Card Image</th>
                            <th>Created on</th>
                            <th>Actions</th>
                        </tr>
                        {posts.map((post) => {
                            return (
                                <tr
                                    className={`default-table-rows ${post.id}`}
                                    key={post.id}
                                >
                                    <td className="default-row-id">{post.id}</td>
                                    <td>
                                        <a href={`${path}/${post.slug}`}>{post.title}</a>
                                    </td>
                                    <td>{post.author}</td>
                                    <td>{post.subject}</td>
                                    <td>
                                        <a
                                            href={`${process.env.APP_PUBLIC_URL}${post.bannerImage}`}
                                            target="_blank"
                                        >
                                            Link
                                        </a>
                                    </td>
                                    <td>
                                        <a
                                            href={`${process.env.APP_PUBLIC_URL}${post.cardImage}`}
                                            target="_blank"
                                        >
                                            Link
                                        </a>
                                    </td>
                                    <td>{post.createdAt}</td>
                                    <td>
                                        <div className="default-buttons-container">
                                            <Button path={`/portal/edit/${type}/${post.slug}`}>
                                                Edit
                                            </Button>
                                            <Button path={`/portal/delete/${type}/${post.slug}`} buttonStyle="btn--red">Delete</Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ViewPosts;
