import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import AdminPanel from "./AdminPanel";
import PageNotFound from "./PageNotFound";

import { Provider } from "react-redux";
import store from "../store/store";

class Router extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={App}></Route>
                        <Route path="/admin" component={AdminPanel}></Route>
                        <Route component={PageNotFound} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default Router;
