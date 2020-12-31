import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { HomePage, ResultPage, LearnMorePage } from "./pages";
import { ResultObj } from "./types";

import "./style/theme.antd.less";
import "./style/main.scss";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route component={ResultPage} path="/result" />
          <Route component={LearnMorePage} path="/learn-more" />
          <Route component={HomePage} path="/" />
        </Switch>
      </BrowserRouter>
      <div className="about">Created by Sahithyan with ❤️</div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
