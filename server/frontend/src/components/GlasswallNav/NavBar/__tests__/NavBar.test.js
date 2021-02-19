import React from "react";
import { mount } from "enzyme";
import TestRenderer from "react-test-renderer";
import { NavBar } from "../NavBar";

const logo = false;
const expanded = true;

const props = {
	logo: logo,
	expanded: expanded
};

test("NavBar_Snapshot", () => {
	// Arrange
	const component = TestRenderer.create(<NavBar {...props} />);

	// Act
	let tree = component.toJSON();

	// Assert
	expect(tree).toMatchSnapshot();
});

test("Displays_Correct_Props", () => {
	// Arrange
	// Act
	const navBarComponent = mount(<NavBar {...props} />);

	// Assert
	expect(navBarComponent.prop("logo")).toEqual(props.logo);
	expect(navBarComponent.prop("expanded")).toEqual(props.expanded);
});