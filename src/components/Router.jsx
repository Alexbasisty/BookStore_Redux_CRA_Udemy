import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import AdminPanel from "./AdminPanel";
import PageNotFound from "./PageNotFound";

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={App}></Route>
                    <Route path="/admin" component={AdminPanel}></Route>
                    <Route component={PageNotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;
