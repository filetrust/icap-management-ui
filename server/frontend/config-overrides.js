// eslint-disable-next-line @typescript-eslint/no-var-requires
const { removeModuleScopePlugin, override, babelInclude } = require("customize-cra");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = override(
	removeModuleScopePlugin(),
	babelInclude([
		path.resolve("src"),
		path.resolve("../src/common/models")
	])
);