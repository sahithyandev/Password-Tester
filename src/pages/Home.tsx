import * as React from "react";
import { useHistory } from "react-router-dom";
import { Typography, Form, Input, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingSpinner = (
	<LoadingOutlined
		style={{ fontSize: 24, color: "#454756", fontWeight: "bolder" }}
		spin
	/>
);

import "./../style/page.home.scss";

const { Title } = Typography;

export const HomePage: React.FC = () => {
	const history = useHistory();
	const [isLoading, setLoading] = React.useState(false);
	const onFinish = (values) => {
		console.log("form:success", values);
		setLoading(true);

		fetch(`/api/main?password=${values["password"]}`)
			.then((response) => response.json())
			.then((result) => {
				history.push("/result", result);
			})
			.catch((error) => {
				alert("Error Occured. Blame the developer.");
				console.error(error);
				setLoading(false);
			});
	};

	const onFinishFailed = (errorInfo) => {
		console.log("form:failed", errorInfo);
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

					<Form.Item className="submit-form-item">
						<Button
							size="middle"
							type="primary"
							htmlType="submit"
							className="submit"
							disabled={isLoading}
						>
							{isLoading ? "Loading..." : "Test Password"}
						</Button>
						<Spin spinning={isLoading} indicator={LoadingSpinner}></Spin>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};
