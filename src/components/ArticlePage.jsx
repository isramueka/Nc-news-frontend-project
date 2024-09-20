import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getArticleById,
  getCommentsByArticleId,
  updateArticleVotes,
  deleteCommentById,
} from "../../utils/api";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import Loading from "./Loading";
import { UserContext } from "../context/UserContext";

const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [votes, setVotes] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteError, setVoteError] = useState(null);
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setError(null);
    getArticleById(article_id)
      .then((data) => {
        setArticle(data.article);
        setVotes(data.article.votes);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Error fetching article");
        setIsLoading(false);
      });
  }, [article_id]);

  useEffect(() => {
    setError(null);
    getCommentsByArticleId(article_id)
      .then((data) => {
        setComments(data.comments);
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Error fetching comments");
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleVote = (voteChange) => {
    // PR on votes
    if (hasVoted) {
      setVoteError("You can only vote once.");
      return;
    }
    setVotes((currVotes) => currVotes + voteChange);
    setHasVoted(true);
    updateArticleVotes(article.article_id, voteChange).catch(() => {
      setVotes((currVotes) => currVotes - voteChange);
      setVoteError("Error: Failed to update votes. Please try again.");
      setHasVoted(false);
    });
  };

  const addComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
    setArticle((prevArticle) => ({
      ...prevArticle,
      comments_count: prevArticle.comments_count + 1,
    }));
  };

  const deleteComment = (comment_id) => {
    deleteCommentById(comment_id)
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== comment_id)
        );
        setArticle((prevArticle) => ({
          ...prevArticle,
          comments_count: prevArticle.comments_count - 1,
        }));
      })
      .catch(() => {
        setError("Failed to delete comment");
      });
  };

  return (
    <article className="article-page">
      <header>
        <h1>{article.title}</h1>
      </header>
      <img src={article.article_img_url} alt={article.title} />
      <section>
        <p>
          <Link to="/">
            <button>⇦</button>
          </Link>
          <strong>By:</strong> {article.author}
        </p>
        <p>{article.body}</p>
      </section>
      <footer>
        <p>
          <button onClick={() => handleVote(1)}>⇧</button>
          <strong>Votes:</strong> {votes}
          &nbsp;
          <button onClick={() => handleVote(-1)}>⇩</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {voteError && <p className="error-message">{voteError}</p>}
          <strong>Comments:</strong> {article.comments_count}
        </p>
        <CommentForm
          article_id={article_id}
          addComment={addComment}
          user={user}
        />
        <CommentList comments={comments} deleteComment={deleteComment} />
      </footer>
    </article>
  );
};

export default ArticlePage;
