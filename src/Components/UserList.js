import React from "react";
import User from "./User";

export default function UserList({ users }) {
  return (
    <div className="user-list">
      {users && users.map((user) => <User key={user.login.uuid} {...user} />)}
    </div>
  );
}
