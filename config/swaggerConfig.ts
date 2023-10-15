import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

const swaggerOptions = {
	definition: {
		openapi: "3.1.0",
		info: {
			version: "1.0.0",
			title: "Starter Template API",
			description: "This is a starter template API",
		},
		basePath: "/api/v1",
		servers: [
			{
				url: process.env.BASE_URL + ":{port}/{basePath}",
				description: "The " + process.env.NODE_ENV + " API server",
				variables: {
					port: {
						default: process.env.PORT,
					},
					basePath: {
						default: "api/v1",
					},
				},
			},
		],
		scheme: ["http", "https"],
	},
	apis: ["./routes/*.ts"],
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

export default swaggerSpecs;
