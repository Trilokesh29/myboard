import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Board from "./Board";
import Home from "./Home";

function Body() {
    return ( <
        Router >
        <
        Switch >
        <
        Route exact path = "/" >
        <
        Home / >
        <
        /Route> <
        Route exact path = "/board" >
        <
        Board / >
        <
        /Route> <
        /Switch> <
        /Router>
    );
}

export default Body;