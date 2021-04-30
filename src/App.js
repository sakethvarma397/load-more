import React from "react";
import Header from "./Components/Header";
import axios from "axios";
import UserList from "./Components/UserList";

export default class App extends React.Component {
  state = {
    users: [],
    loading: false,
    errorMsg: "",
    page: 0,
  };

  loadUsers = () => {
    this.setState({ loading: true });
    const { page } = this.state;
    axios
      .get(`https://randomuser.me/api/?${page}&results=10`)
      .then((response) => {
        this.setState((prevState) => ({
          users: [...prevState.users, ...response.data.results],
          errorMsg: "",
        }));
        // { users: response.data.results, errorMsg: "" });
        // console.log(response.data.results);
      })
      .catch(() => {
        this.setState({ errorMsg: "Error while loading data" });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  loadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this.loadUsers();
    }
  }

  componentDidMount() {
    this.loadUsers();
  }

  render() {
    const { loading, errorMsg, users } = this.state;
    return (
      <div className="main-section">
        <Header />
        <UserList users={users} />
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <div className="load-more">
          <button onClick={this.loadMore} className="btn-grad">
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      </div>
    );
  }
}
