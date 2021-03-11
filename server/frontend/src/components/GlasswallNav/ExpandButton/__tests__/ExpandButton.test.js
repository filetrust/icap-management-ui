import React from "react";
import { mount } from "enzyme";
import TestRenderer from "react-test-renderer";
import { ExpandButton } from "../ExpandButton";

const expanded = true;

const clickHandler = () => {
	console.log("expanded: " + !expanded);
};

const props = {
	expanded: expanded,
	clickHandler: clickHandler
};

test("ExpandButton_Snapshot", () => {
	// Arrange
	const component = TestRenderer.create(<ExpandButton {...props} />);

	// Act
	let tree = component.toJSON();

	// Assert
	expect(tree).toMatchSnapshot();
});

test("Displays_Correct_Props", () => {
	// Act
	const expandButtonComponent = mount(<ExpandButton {...props} />);

	// Assert
	expect(expandButtonComponent.prop("expanded")).toEqual(props.expanded);
	expect(expandButtonComponent.prop("clickHandler")).toEqual(props.clickHandler);
});