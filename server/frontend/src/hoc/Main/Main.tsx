import React, { useContext } from "react";
import styles from "./Main.module.scss";

import { GlobalStoreContext } from "../../context/globalStore/globalStore-context";

export interface MainProps { children?: React.ReactNode, externalStyles?: string }

const Main = (props: MainProps) => {
	const { navExpanded } = useContext(GlobalStoreContext);

	return (
		<>
			<div
				className={`${styles.main} ${navExpanded ? styles.expanded : ""} ${props.externalStyles}`}>
				<div className={styles.content}>{props.children}</div>
			</div>
		</>
	);
};

export default Main;
