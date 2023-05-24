import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const Users = (props) => {
  const [title] = useState("TOOFAN - APP");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const getUsers = async () => {
    props.setProgress(30);
    const url = `https://jsonplaceholder.typicode.com/users`;
    let data = await fetch(url);
    props.setProgress(40);
    let AllUsers = await data.json();
    props.setProgress(75);
    setUsers(AllUsers);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = title;
    getUsers();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {}, []);
  return (
    <div className="container">
      <h1 style={{ marginTop: "80px" }}>TooFan Users</h1>
      {loading && <Spinner />}

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">FullName</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address.street + ", " + user.address.city}</td>
                <td>
                  <Link className="btn btn-success" to={`/user/${user.id}`}>
                    View
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
