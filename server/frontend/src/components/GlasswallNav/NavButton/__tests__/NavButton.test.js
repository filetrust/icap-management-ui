import React from "react";
import { mount } from "enzyme";
import TestRenderer from "react-test-renderer";
import { NavButton } from "../NavButton";

const selected = true;

const clickHandler = () => {
	console.log("click handled.");
};

const props = {
	selected: selected,
	clickHandler: clickHandler
};

test("NavButton_Snapshot", () => {
	// Arrange
	const component = TestRenderer.create(<NavButton {...props} />);

	// Act
	let tree = component.toJSON();

	// Assert
	expect(tree).toMatchSnapshot();
});

test("Displays_Correct_Props", () => {
	// Arrange
	// Act
	const navButtonComponent = mount(<NavButton {...props} />);

	// Assert
	expect(navButtonComponent.prop("selected")).toEqual(props.selected);
	expect(navButtonComponent.prop("clickHandler")).toEqual(props.clickHandler);
});