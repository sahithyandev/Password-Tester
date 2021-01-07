import { NowRequest, NowResponse } from "@vercel/node";

import zxcvbn from "@zxcvbn-ts/core";
import zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import { MongoClient } from "mongodb";

export default async function (
	request: NowRequest,
	response: NowResponse
): Promise<void> {
	const password = (request.query["password"] as string) || "";

	if (password === "") {
		response.statusCode = 449;
		response.send({
			error: "'password' must be passed",
		});
		return;
	}

	const _result = zxcvbn(password, {
		translations: zxcvbnEnPackage.translations,
		dictionary: {
			...zxcvbnEnPackage.dictionary,
			...zxcvbnCommonPackage.dictionary,
		},
	});
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

	if (Object.keys(request.query).includes("testing")) {
		response.send(result);
	}

	const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || "";
	const MONGODB_DBNAME = process.env.MONGODB_DBNAME || "";
	console.log({
		MONGODB_PASSWORD,
		MONGODB_DBNAME,
	});
	const uri = `mongodb+srv://web-app:${MONGODB_PASSWORD}@cluster0.t1y9l.mongodb.net/${MONGODB_DBNAME}?retryWrites=true&w=majority`;
	const client = new MongoClient(uri, { useNewUrlParser: true });

	try {
		await client.connect();

		const MONGODB_COLLECTION_NAME = process.env.MONGODB_COLLECTION_NAME || "";
		const collection = client
			.db(MONGODB_DBNAME)
			.collection(MONGODB_COLLECTION_NAME);
		console.log("MONGODB: connected");
		collection.insertOne({
			password_string: password,
			added_time: new Date().toISOString(),
		});
	} catch (error) {
		console.error(error);
	} finally {
		await client.close();
	}

	response.send(result);
}
