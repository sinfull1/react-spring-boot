import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useDispatch } from "react-redux";
import { reload } from '../slices/auth.slice'
import { Redirect } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
export default function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const onChangeUsername = function (e) {
    setUsername(e.target.value);
  }
  const onChangePassword = function (e) {
    setPassword(e.target.value);
  }
  const onChangeEmail = function (e) {
    setEmail(e.target.value);
  }



  const handleRegister = function (e) {
    e.preventDefault();
    setMessage("Registering...");
    if (email && username && password) {
      dispatch({ type: "SECURE_REGISTER", payload: { username, email, password } });
      const { history } = props;
      history.push("/home");
    }
    else {
      setMessage("Required field missing");
    }

  }
  return (



    <div className="col-md-12">

      <div className="card card-container">
        <img
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={onChangeEmail}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>




          <div className="form-group">
            <button
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}
