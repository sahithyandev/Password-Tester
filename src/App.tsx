import * as React from "react";
import * as ReactDOM from "react-dom";
import { Typography, Button, Input, Form } from "antd";

import { Result } from "./components/Result";
import { ResultObj } from "./types";

import "./style/theme.antd.less";
import "./style/main.scss";

const { Title } = Typography;

export const App = () => {
  const [result, setResult] = React.useState<any>(null);

  const onFinish = (values) => {
    console.log("Success:", values);

    fetch(`/api/main?password=${values["password"]}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setResult(result);
      })
      .catch(console.error);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="home-page">
      <div className="main-content">
        <Title className="main-title">Password Tester</Title>
        <div>
          {!result ? (
            <Form
              layout="vertical"
              initialValues={{ password: "" }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              requiredMark={false}
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
      </div>

      <div className="about">Created by Sahithyan with ❤️</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
