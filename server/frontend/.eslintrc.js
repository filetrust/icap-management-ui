module.exports = {
	parser: "@typescript-eslint/parser",
	ignorePatterns: ["serviceWorker.js", "node_modules/"],
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
		jest: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended"
	],
	parserOptions: {
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true,
		},
		sourceType: "module",
	},
	plugins: [
		"react", "@typescript-eslint"
	],
	rules: {
		"react/prop-types": ["off"],
		"react/display-name": ["off"],
		"react/no-unescaped-entities": ["off"],
		"react/jsx-closing-bracket-location": ["error", "after-props"],
		"react/jsx-closing-tag-location": ["error"],
		"react/no-string-refs": ["error"],
		"jsx-quotes": ["error", "prefer-double"],
		"func-style": ["error", "expression", { "allowArrowFunctions": true }],
		indent: ["error", "tab", { SwitchCase: 1 }],
		"linebreak-style": ["off"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"no-console": ["warn", { allow: ["clear", "info", "error", "dir", "trace"] }],
		curly: "error",
		"no-else-return": "error",
		"no-unneeded-ternary": "error",
		"no-useless-return": "error",
		"no-var": "error",
		"one-var": ["error", "never"],
		"prefer-arrow-callback": "error",
		strict: "error",
		"symbol-description": "error",
		yoda: ["error", "never", { exceptRange: true }],
		"no-unused-vars": ["off"],
		"@typescript-eslint/no-unused-vars": "error",
		"@typescript-eslint/explicit-module-boundary-types": "off"
	},
	globals: {
		"JSX": "readonly",
		"Partial": "readonly",
		"interface": "readonly"
	}
};