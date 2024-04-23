import React from "react";
// import { useState, useEffect } from "react";
import { Button } from "@/components/Button";
// import "./ViewArticles.css";
import "../View.css";
import { Link } from "next/link";
import { index, remove } from "@/lib/routes";
import { revalidateTag } from "next/cache";

async function ViewArticles() {
  revalidateTag("/posts/article");
  const articles = await index("/posts/article");
  //sorting function

  function articleDelete(article) {
    if (!window.confirm("Are you sure you want to delete this article?")) {
      return;
    } else {
      remove(`posts/article/`, article.id);
    }
  }

  return (
    <>
      <div className="article-view-wrapper upload-subwrapper">
        <p className="article-view-heading upload-subheader">
          View/Edit Articles
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
            {articles.map((article) => {
              return (
                <tr
                  className={`default-table-rows ${article.id}`}
                  key={article.id}
                >
                  <td className="default-row-id">{article.id}</td>
                  <td>
                    <a href={`/articles/${article.slug}`}>{article.title}</a>
                  </td>
                  <td>{article.author}</td>
                  <td>{article.subject}</td>
                  <td>
                    <a
                      href={`${process.env.APP_PUBLIC_URL}${article.bannerImage}`}
                      target="_blank"
                    >
                      Link
                    </a>
                  </td>
                  <td>
                    <a
                      href={`${process.env.APP_PUBLIC_URL}${article.cardImage}`}
                      target="_blank"
                    >
                      Link
                    </a>
                  </td>
                  <td>{article.createdAt}</td>
                  <td>
                    <div className="default-buttons-container">
                      <Button path={`/portal/edit/article/${article.id}`}>
                        Edit
                      </Button>
                      <Button buttonStyle="btn--red">Delete</Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* 
          {articles.map((a, key) => {
            return (
              <>
                <tr className={`default-table-rows ${a.id}`} key={a.id}>
                  <td className="default-row-id">{a.id}</td>
                  <td className="default-row-title">
                    <Link to={`/articles/${a.id}`}>{a.title}</Link>
                  </td>
                  <td className="default-row-author">{a.author}</td>
                  <td className="default-row-subject">{a.subject}</td>
                  <td className="article-row-bImg">
                    <a
                      href={`${process.env.APP_PUBLIC_URL}${a.bannerImage}`}
                      target="_blank"
                    >
                      Link
                    </a>
                  </td>
                  <td className="article-row-cImg">
                    <a
                      href={`${process.env.APP_PUBLIC_URL}${a.cardImage}`}
                      target="_blank"
                    >
                      Link
                    </a>
                  </td>
                  <td className="default-row-date">{a.created_at}</td>
                  <td>
                    <div className="default-buttons-container">
                      <Button path={`/portal/edit/article/${a.id}`}>
                        Edit
                      </Button>
                      <Button
                        buttonStyle="btn--red"
                        onClick={(e) => {
                          articleDelete(a);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              </>
            );
          })}
        </table> */}
      </div>
    </>
  );
}

export default ViewArticles;
