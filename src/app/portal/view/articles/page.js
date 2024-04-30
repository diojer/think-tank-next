
import ViewPosts from "@/app/portal/view/posts/viewPosts";

export default async function ViewArticles() {
  const type = "article";
  return await ViewPosts(type, "/articles");
}

