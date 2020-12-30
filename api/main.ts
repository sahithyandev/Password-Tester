import zxcvbn from "zxcvbn";
import { NowRequest, NowResponse } from "@vercel/node";

// interface ResultObj {
//   score: number;
//   improvementTips: string[];
// }

export default function (request: NowRequest, response: NowResponse) {
  const password = request.query["password"] || "";

  if (password === "") {
    response.statusCode = 400; // TODO find the correct error code
    response.send({
      error: "'password' must be passed",
    });
  } else {
    // let result: ResultObj = {
    //   score: 0,
    //   improvementTips: [],
    // };
    const result = zxcvbn(password);
    response.statusCode = 200;

    response.send(result);
  }
}
