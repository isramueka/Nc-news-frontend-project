import axios from "axios";

const ncNewsAPI = axios.create({
  baseURL: "https://nc-news-project-fd36.onrender.com/api",
});

export function getArticles(query) {
  return ncNewsAPI.get("/articles", query).then(({ data }) => {
    return data;
  });
}
