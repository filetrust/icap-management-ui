import React from "react";

import classes from "./NavigationItems.module.scss";

import NavigationItem from "./NavigationItem/NavigationItem";

export interface NavigationItemsProps {
	expanded: boolean,
	items:
	{
		link: string,
		name: string,
		icon: string,
		id: string,
		testId: string,
		onClick?: () => void,
		exact?: boolean,
	}[]
}

const NavigationItems = (props: NavigationItemsProps) => {
	const cls = [classes.NavigationItems];
	if (props.expanded) {
		cls.push(classes.menuExpanded);
	}

	const links = props.items.map((it) => {
		return (
			<NavigationItem
				testId={it.testId}
				key={it.id}
				path={it.link}
				icon={it.icon}
				exact={it.exact}
				onClick={it.onClick}>
				<div>
					<p data-test-id={it.testId}>{it.name}</p>
				</div>
			</NavigationItem>
		);
	});

	return (
		<nav className={cls.join(" ")}>
			<ul>{links}</ul>
		</nav>
	);
};

export default NavigationItems;
