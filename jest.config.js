/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	clearMocks: true,
	coverageProvider: "v8",
	moduleFileExtensions: ["js", "ts"],
	roots: ["<rootDir>"],
	testMatch: ["**/tests/**/*.ts"],
	transform: {
		"^.+\\.ts$": "ts-jest",
	},
	preset: "ts-jest",
};
