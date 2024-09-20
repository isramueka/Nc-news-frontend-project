import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, updateArticleVotes } from "../../utils/api";
import CommentList from "./CommentList";

const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [votes, setVotes] = useState(null);
  const [voteError, setVoteError] = useState(null);

  useEffect(() => {
    setError(null);
    getArticleById(article_id)
      .then((data) => {
        setArticle(data.article);
        setVotes(data.article.votes);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Error fetching article");
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <p>Loading article...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleVote = (voteChange) => {
    setVoteError(null);
    setVotes((currVotes) => currVotes + voteChange);
    updateArticleVotes(article.article_id, voteChange).catch(() => {
      setVotes((currVotes) => currVotes - voteChange);
      setVoteError("Error: Failed to update votes. Please try again.");
    });
  };

  return (
    <div className="article-page">
      <h1>{article.title}</h1>
      <img src={article.article_img_url} alt={article.title} />
      <p>
        <strong>By:</strong> {article.author}
      </p>
      <p>{article.body}</p>
      <p>
        <button onClick={() => handleVote(1)}>⇧</button>
        <strong>Votes:</strong> {votes} &nbsp;
        <button onClick={() => handleVote(-1)}>⇩</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <strong>Comments:</strong> {article.comments_count}
      </p>
      <CommentList article_id={article_id} />
    </div>
  );
};

export default ArticlePage;
