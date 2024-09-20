import React from "react";
import CommentCard from "./CommentCard";

const CommentList = ({ comments, deleteComment }) => {
  //Handle articles with no comments as PR feedback
  if (comments.length === 0) {
    return <p>No comments yet. Be the first to comment!</p>;
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentCard
          key={comment.comment_id}
          comment={comment}
          deleteComment={deleteComment}
        />
      ))}
    </div>
  );
};

export default CommentList;
