import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useDispatch,useSelector } from "react-redux";
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
export default function Login(props) {
    const statusM = useSelector(state => state.auth.message)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const loading = useSelector(state => state.auth.loading)
    const dispatch = useDispatch()
    const onChangeUsername = function (e) {
        setUsername(e.target.value);
    }
    const onChangePassword = function (e) {
        setPassword(e.target.value);
    }
    const isLoggedIn = function () {
        return localStorage.getItem("user");
    }

    const handleLogin = function (e) {
        e.preventDefault();
        if (username && password) {
           dispatch({ type: "SECURE_LOGIN", payload: { username, password} });
        }
       
    }
    return (

            <div className="col-md-12">

                <div className="card card-container">
                    <img
                        className="profile-img-card"
                    />

                    <Form onSubmit={handleLogin}>
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

                        {statusM && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {statusM}
                                </div>
                            </div>
                        )}
                    </Form>
                </div>
            </div>
    );
}
