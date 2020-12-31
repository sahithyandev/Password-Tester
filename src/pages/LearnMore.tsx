import * as React from "react";
import { Typography } from "antd";

const { Title } = Typography;
export const LearnMorePage = (props) => {
  return (
    <div className="page learn-more-page">
      <Title>Password Tester</Title>
      <div className="main-content">
        <p>
          Password Tester relies on a{" "}
          <i>third-party open-source program named zxcvbn</i> to calculate the
          strength of a password.
        </p>
      </div>
    </div>
  );
};
