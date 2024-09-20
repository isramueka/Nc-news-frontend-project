import React, { useContext, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { UserContext } from "../context/UserContext";

const CommentCard = ({ comment, deleteComment }) => {
  const { author, body, created_at, votes, comment_id } = comment;
  const { user } = useContext(UserContext);

  return (
    <div className="comment-card">
      <p>
        <strong>{author} ·</strong>{" "}
        {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
      </p>
      <p>{body}</p>
      <p>
        <strong>Votes:</strong> {votes}
      </p>
      {user.username === author && (
        <button onClick={() => deleteComment(comment_id)}>Delete</button>
      )}
    </div>
  );
};

export default CommentCard;
