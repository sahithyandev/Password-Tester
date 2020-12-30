import * as React from "react";
import * as ReactDOM from "react-dom";
import { Typography } from "antd";

import "./style/main.scss";
import "./style/theme.antd.less";

const { Title } = Typography;

// Import PNG like this
// import logo from "./assets/logo.png";

// Import SVG like this
// import logo from "./assets/logo.svg";

export const App = () => {
  // const;

  return (
    <div>
      <Title className="main-title">Password Tester</Title>
      <div>
        <h2></h2>
        {/* Insert Antdesign Input here */}
      </div>

      <div id="about">Created by Sahithyan with ❤️</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
