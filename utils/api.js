import axios from "axios";

const ncNewsAPI = axios.create({
  baseURL: "https://nc-news-project-fd36.onrender.com/api",
});

export function getArticles() {
  return ncNewsAPI.get("/articles").then(({ data }) => {
    return data;
  });
}

export function getArticleById(article_id) {
  return ncNewsAPI.get(`/articles/${article_id}`).then(({ data }) => {
    return data;
  });
}

export function getCommentsByArticleId(article_id) {
  return ncNewsAPI.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data;
  });
}

export function updateArticleVotes(article_id, voteChange) {
  return ncNewsAPI
    .patch(`/articles/${article_id}`, { upd_votes: voteChange })
    .then(({ data }) => {
      return data.article;
    });
}
