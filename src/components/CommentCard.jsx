import React from "react";
import { formatDistanceToNow } from "date-fns";

const CommentCard = ({ comment }) => {
  const { author, body, created_at, votes } = comment;

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
    </div>
  );
};

export default CommentCard;
