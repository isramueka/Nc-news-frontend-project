import axios from "axios";

const ncNewsAPI = axios.create({
  baseURL: "https://nc-news-project-fd36.onrender.com/api",
});

export function getArticles(params = {}) {
  return ncNewsAPI.get("/articles", { params }).then(({ data }) => {
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

export const postCommentForArticle = (article_id, comment, loggedInUser) => {
  const bodyComment = {
    body: comment.body,
    username: loggedInUser.username,
  };

  return ncNewsAPI
    .post(`/articles/${article_id}/comments`, bodyComment)
    .then(({ data }) => {
      return data.comment;
    });
};

export const deleteCommentById = (comment_id) => {
  return ncNewsAPI.delete(`/comments/${comment_id}`).then(() => {
    return "204";
  });
};

export const getTopics = () => {
  return ncNewsAPI.get(`/topics`).then(({ data }) => {
    return data.topics;
  });
};
