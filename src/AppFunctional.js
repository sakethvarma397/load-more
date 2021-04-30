import React, { useEffect, useState } from "react";
import UserList from "./Components/UserList";
import Header from "./Components/Header";
import axios from "axios";

export default function AppFunctional() {
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const x = "Hello";
    const loadUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://randomuser.me/api/?${page}&results=10`
        );

        // setUsers([...users, ...response.data.results]);
        // In the above line, we are using the users state.
        // So we get a warning to use the users in the UseEffect dependency list, which we dont want.
        // If we add, it becomes an infinite loop and the the users keep rendering continuosly to the page.

        // Instead you could do this.
        setUsers((users) => [...users, ...response.data.results]);
        // Here we are just using the previous value of users but not users state directly.

        setErrorMsg("");
      } catch {
        setErrorMsg("Something wwnt wrong in API call");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [page]);

  const loadMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <div className="main-section">
      <Header />
      <UserList users={users} />
      {errorMsg && <p class="errorMsg">{errorMsg}</p>}
      <div className="load-more">
        <button className="btn-grad" onClick={loadMore}>
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
}
