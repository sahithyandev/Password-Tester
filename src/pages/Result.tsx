import * as React from "react";
import { Typography, Progress } from "antd";

import { ResultObj } from "../types";
import "./../style/page.result.scss";

const { Title } = Typography;

interface PropTypes {
  data?: any;
}

const scoreClassName = (score: string, type: "bar" | "text" = "text") =>
  `score-${type}--${score.replace(" ", "-")}`;

export const ResultPage = ({ data }: PropTypes) => {
  if (!data) {
    data = {
      password: "sahithyan",
      score: { value: 3, display_value: "strong" },
      crack_seconds: {
        slowest: { value: 3600360000, display_value: "centuries" },
        fastest: { value: 0.010001, display_value: "less than a second" },
      },
      feedback: {
        warning: "This is one of the top-10 common passwords",
        suggestions: ["Add one or two words."],
      },
    };
  }
  const { password, score, crack_seconds, feedback } = data;
  console.log(feedback);
  return (
    <div className="result-page">
      <Title className="main-title">Password Tester</Title>

      <div className="main-content">
        <Progress
          percent={score.value * 20}
          showInfo={false}
          className={[
            "score-bar",
            scoreClassName(score.display_value, "bar"),
          ].join(" ")}
        />
        <h2
          className={["score-text", scoreClassName(score.display_value)].join(
            " "
          )}
        >
          {score.display_value}
        </h2>
      </div>

      <div className="secondary-content improvement-tips-container">
        <ul>
          {feedback.suggestions.map((suggestion) => {
            return <li className="suggestion">{suggestion}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};
