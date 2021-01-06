import * as React from "react";
import { Button, Typography, Progress } from "antd";

import "./../style/page.result.scss";
import { useHistory, useLocation, Link } from "react-router-dom";

const { Title } = Typography;

interface DataModel {
  password: string;
  score: {
    value: number;
    display_value: string;
  };
  crack_seconds: {
    slowest: { value: number; display_value: string };
    fastest: { value: number; display_value: string };
  };
  feedback: {
    warning: string;
    suggestions: string[];
  };
}

const scoreClassName = (score: number, type: "bar" | "text" = "text") =>
  `score-${type}--${score}`;

export const ResultPage = (props) => {
  const location = useLocation();

  let data = location.state as DataModel;
  if (!data) {
    useHistory().push("/");
  }

  console.log(data);
  const { password, score, crack_seconds, feedback } = data;

  return (
    <div className="page result-page">
      <Title className="main-title">Password Tester</Title>

      <div className="main-content">
        <Progress
          percent={score.value * 20}
          showInfo={false}
          className={["score-bar", scoreClassName(score.value, "bar")].join(
            " "
          )}
        />
        <h2 className={["score-text", scoreClassName(score.value)].join(" ")}>
          {score.display_value}
        </h2>

        <p className="crack-time">
          To brute-force this password, it would take from{" "}
          <span className="crack-time--important">
            {crack_seconds.slowest.display_value}{" "}
          </span>
          to{" "}
          <span className="crack-time--important">
            {crack_seconds.fastest.display_value}
          </span>
        </p>
      </div>

      {!feedback.warning && feedback.suggestions.length == 0 ? null : (
        <div className="secondary-content improvement-tips-container">
          <ul>
            {feedback.warning ? (
              <li key={feedback.warning} className="warning">
                {feedback.warning}
              </li>
            ) : null}
            {feedback.suggestions.map((suggestion) => {
              return (
                <li key={suggestion} className="suggestion">
                  {suggestion}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <Link to="/learn-more" className="learn-more">
        Learn more about the calculations
      </Link>
      <Button type="primary">Check Another Password</Button>
    </div>
  );
};
