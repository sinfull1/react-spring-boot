import React, {Component} from "react";

import {Link} from "react-router-dom";
import {Redirect} from "react-router-dom";
import Header from "./header.component";

export default function Home(props) {

    return !localStorage.getItem("user") ?
        ( <>
            <Redirect to="/login"/>
            </>
        )
        :
        (<div className="container">

                <header className="jumbotron">
                    <p><Link to={"/eventGrid"}> Event Grid </Link>with Adhoc reactivity design</p>
                    <p><Link to={"/upload"}> Upload </Link> Download functionality on with filesystem </p>
                    <p><Link to={"/kafka"}> Kafka </Link> high transaction simulator</p>
                    <p><Link to={"/spark"}> Spark </Link> for file based analytics</p>
                    <p><Link to={"/d3"}> D3 Charts </Link> with high repaint</p>
                    <p><Link to={"/book"}> bookTickets</Link> with high repaint</p>
                </header>
            </div>
        );
}

