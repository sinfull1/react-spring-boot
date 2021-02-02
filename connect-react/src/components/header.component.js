import {Link} from "react-router-dom";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout, reload} from "../slices/auth.slice";


export default function Header(props)
{
    const dispatch = useDispatch();
    function signOut() {
        dispatch(logout());
        dispatch(reload());
    }
    const user = localStorage.getItem("name")
    return (
        <div className="container">
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                    Welcome, {user} 
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                            Home
                        </Link>
                    </li>

                </div>

                {localStorage.getItem("user") ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a href="/home" className="nav-link" onClick={signOut}>
                                LogOut
                            </a>
                        </li>
                        <li className="nav-item">
                            <Link to={"/upload"} className="nav-link">
                                Upload
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/eventGrid"} className="nav-link">
                                EventGrid
                            </Link>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>
                        <div className="navbar-nav ml-auto">

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>

                        </div>


                    </div>
                )}
            </nav>
        </div>


    );


}