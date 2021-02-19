import React, { useContext } from "react";
import styles from "./MainTitle.module.scss";

import { GlobalStoreContext } from "../../context/globalStore/globalStore-context";

export interface MainTitleProps {
	title: string
}

const MainTitle = (props: MainTitleProps) => {
	const { navExpanded } = useContext(GlobalStoreContext);

	return (
		<h1
			className={`${styles.pageHeading} ${navExpanded ? styles.expanded : ""}`}>
			{props.title}
		</h1>
	);
};

export default MainTitle;
