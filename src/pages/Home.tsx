import * as React from "react";
import { Typography, Form, Input, Button } from "antd";

const { Title } = Typography;

import "./../style/page.home.scss";

export const HomePage = () => {
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
    <div className="page home-page">
      <div className="main-content">
        <Title className="main-title">Password Tester</Title>
        <div>
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
        </div>
      </div>
      {/* TODO move this to App.tsx outside react-router */}
      <div className="about">Created by Sahithyan with ❤️</div>
    </div>
  );
};
