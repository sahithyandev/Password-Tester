import zxcvbn from "zxcvbn";
import { NowRequest, NowResponse } from "@vercel/node";
const MongoClient = require("mongodb").MongoClient;

// interface ResultObj {
//   score: number;
//   improvementTips: string[];
// }

export default function (request: NowRequest, response: NowResponse) {
  const password = request.query["password"] || "";
  const user_inputs = ((request.query["user_inputs"] as string) || "").split(
    ","
  );

  if (password === "") {
    response.statusCode = 400; // TODO find the correct error code
    response.send({
      error: "'password' must be passed",
    });
    return;
  }
  const _result = zxcvbn(password, user_inputs);
  if (Object.keys(request.query).includes("original")) {
    response.send(_result);
    return;
  }

  const SCORE_DISPLAY_VALUES = {
    // add colors here
    0: "worse",
    1: "bad",
    2: "average",
    3: "strong",
    4: "very strong",
  };

  const result = {
    password: _result["password"],
    score: {
      value: _result["score"],
      display_value: SCORE_DISPLAY_VALUES[_result["score"]],
    },
    crack_seconds: {
      slowest: {
        value: _result["crack_times_seconds"]["online_throttling_100_per_hour"],
        display_value:
          _result["crack_times_display"]["online_throttling_100_per_hour"],
      },
      fastest: {
        value:
          _result["crack_times_seconds"][
            "offline_fast_hashing_1e10_per_second"
          ],
        display_value:
          _result["crack_times_display"][
            "offline_fast_hashing_1e10_per_second"
          ],
      },
    },
    feedback: _result["feedback"],
  };

  response.statusCode = 200;

  response.send(result);
}
