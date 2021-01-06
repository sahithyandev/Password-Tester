import * as React from "react";
import { useHistory } from "react-router-dom";
import { Typography, Form, Input, Button } from "antd";

import "./../style/page.home.scss";

const { Title } = Typography;

export const HomePage: React.FC = () => {
	const history = useHistory();
	const onFinish = (values) => {
		console.log("Success:", values);

		fetch(`/api/main?password=${values["password"]}`)
			.then((response) => response.json())
			.then((result) => {
				history.push("/result", result);
			})
			.catch(console.error);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div className="page home-page">
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
	);
};
