import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import "./normalize.css";
import 'react-toastify/dist/ReactToastify.css';

import { GlobalStoreState } from "./context/globalStore/GlobalStoreState";
import { UserState } from "./context/user/UserState";
import App from "./App";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
	// <React.StrictMode>
	<GlobalStoreState>
			<UserState>
				<App />
			</UserState>
	</GlobalStoreState>,
	// </React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
