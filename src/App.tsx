import * as React from "react";
import * as ReactDOM from "react-dom";
import { Typography, Button, Input, Form } from "antd";

import { HomePage } from "./pages/Home";
import { ResultPage } from "./pages/Result";
import { ResultObj } from "./types";

import "./style/theme.antd.less";
import "./style/main.scss";

const { Title } = Typography;

export const App = () => {
  // Change with react-router
  return <ResultPage />;
};

ReactDOM.render(<App />, document.getElementById("root"));
