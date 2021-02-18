import React from "react";
import TestRenderer from "react-test-renderer";
import { NavSpacer } from "../NavSpacer";

test("NavSpacer_Snapshot", () => {
	// Arrange
	const component = TestRenderer.create(<NavSpacer />);

	// Act
	let tree = component.toJSON();

	// Assert
	expect(tree).toMatchSnapshot();
});