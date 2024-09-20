import React, { useState, useContext } from "react";
import { postCommentForArticle } from "../../utils/api";

const CommentForm = ({ article_id, addComment, user }) => {
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to post a comment.");
      return;
    }
    if (!commentText.trim()) {
      setError("Comment can't be empty!");
      return;
    }
    setError(null);
    setIsSubmitting(true);

    const newComment = {
      body: commentText,
    };

    postCommentForArticle(article_id, newComment, user)
      .then((newComment) => {
        console.log(newComment);
        addComment(newComment);
        setCommentText("");
        setIsSubmitting(false);
      })
      .catch((err) => {
        setError("Failed to post comment. Please try again.");
        setIsSubmitting(false);
      });
  };

  return (
    <section className="comment-form">
      <h3>Add a Comment:</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write your comment..."
          rows="3"
          required={true}
          disabled={isSubmitting}
        ></textarea>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Comment"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </section>
  );
};

export default CommentForm;
