import { NowRequest, NowResponse } from "@vercel/node";

import zxcvbn from "@zxcvbn-ts/core";
import zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import zxcvbnEnPackage from "@zxcvbn-ts/language-en";
const MongoClient = require("mongodb").MongoClient;

export default function (request: NowRequest, response: NowResponse) {
  const password = (request.query["password"] as string) || "";

  if (password === "") {
    response.statusCode = 400; // TODO find the correct error code
    response.send({
      error: "'password' must be passed",
    });
    return;
  }
  const _result = zxcvbn(password);
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
        value: _result["crackTimesSeconds"]["onlineThrottling100PerHour"],
        display_value:
          _result["crackTimesDisplay"]["onlineThrottling100PerHour"],
      },
      fastest: {
        value: _result["crackTimesSeconds"]["offlineFastHashing1e10PerSecond"],
        display_value:
          _result["crackTimesDisplay"]["offlineFastHashing1e10PerSecond"],
      },
    },
    feedback: _result["feedback"],
  };

  response.statusCode = 200;

  response.send(result);
}
