import * as React from "react";
import * as ReactDOM from "react-dom";
import { Typography, Button, Input, Form } from "antd";

import { Result } from "./components/Result";
import { ResultObj } from "./types";

import "./style/main.scss";
import "./style/theme.antd.less";

const { Title } = Typography;

export const App = () => {
  const [result, setResult] = React.useState<ResultObj>(null);

  const onFinish = (values) => {
    console.log("Success:", values);

    fetch(`/api/main?password=${values["password"]}`)
      .then((a) => a.json())
      .then((c) => {
        console.log(c);
      })
      .catch((w) => {
        console.log(w);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="app">
      <Title className="main-title">Password Tester</Title>
      <div>
        {!result ? (
          <Form
            initialValues={{ password: "" }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Give a password to test" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button size="middle" type="primary" htmlType="submit">
                Test
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Result data={result} />
        )}
      </div>

      <div className="about">Created by Sahithyan with ❤️</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
