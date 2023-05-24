import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "./Spinner";

const User = (props) => {
  const params = useParams();
  const [title] = useState(" - TooFan");
  const defaultUser = {
    username: "",
    phone: "",
    email: "",
    website: "",
    address: {
      street: "",
      city: "",
      zipcode: "",
    },
    company: {
      name: "",
    },
  };

  const [user, setUser] = useState(defaultUser);
  const [loading, setLoading] = useState(true);
  const getUser = async () => {
    props.setProgress(30);
    const url = `https://jsonplaceholder.typicode.com/users/${params.id}`;
    let data = await fetch(url);
    props.setProgress(40);
    let SingleUser = await data.json();
    props.setProgress(75);
    setUser(SingleUser);
    setLoading(false);
    props.setProgress(100);
    document.title = SingleUser.name + title;
  };
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div style={{ marginTop: "90px" }}>{loading && <Spinner />}</div>
      {!loading && (
        <>
          <div
            className="d-flex justify-content-center"
            style={{ margin: "70px 0px 20px" }}
          >
            <div className="card mt-5" style={{ width: "30rem" }}>
              <div className="card-header fw-bold bg-info text-uppercase text-center">
                {user.name}'s Profile
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Name: <b>{user.name}</b>
                </li>
                <li className="list-group-item">
                  Username: <b>{user.username}</b>
                </li>
                <li className="list-group-item">
                  Phone: <b>{user.phone}</b>
                </li>
                <li className="list-group-item">
                  Email: <b>{user.email}</b>
                </li>
                <li className="list-group-item">
                  Website: <b>{user.website}</b>
                </li>
                <li className="list-group-item">
                  Company: <b>{user.company.name}</b>
                </li>
                <li className="list-group-item">
                  ZipCode: <b>{user.address.zipcode}</b>
                </li>
                <li className="list-group-item">
                  Address:{" "}
                  <b>{user.address.street + ", " + user.address.city}</b>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-3 d-flex justify-content-center">
            <Link to="/" className="btn btn-secondary">
              Go Back
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default User;
