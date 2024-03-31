const articles_path = `${process.env.APP_URL}/api/articles/`;

export async function indexArticles() {
  const response = await fetch(articles_path);
  const data = await response.json();
  return data.data;
}

export async function getArticle(id) {
  const response = await fetch(`${articles_path}${id}`);
  const data = await response.json();
  return data.data;
}
