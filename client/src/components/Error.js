import React from "react";

export default function Error({ error }) {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return (
      <div className="form-group alert alert-danger">
        {error.networkError.result.errors.map((error, i) => (
          <p>{error.message.replace("GraphQL error: ", "")}</p>
        ))}
      </div>
    );
  }
  return (
    <div className="form-group alert alert-danger">
      <p>{error.message.replace("GraphQL error: ", "")}</p>
    </div>
  );
}
