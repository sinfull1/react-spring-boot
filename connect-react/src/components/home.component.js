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
                   {/* <p><Link to={"/eventGrid"}> Event Grid </Link>with Adhoc reactivity design</p>*/}
                    <p><Link to={"/upload"}> Upload </Link> Upload/Download functionality </p>
                    <p><Link to={"/kafka"}> Kafka </Link> high transaction simulator</p>
                    <p><Link to={"/spark"}> Spark </Link> for file based analytics</p>
                    <p><Link to={"/d3"}> Server Side Events D3 Charts </Link> Two variable in incremental redraw</p>
                    <p><Link to={"/book"}> Flight Booking UX</Link> A reactive flight booking UX with suggestions</p>
                  
                </header>
            </div>
        );
}

