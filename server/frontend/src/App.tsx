import React, { useContext } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

import { UserContext } from "./context/user/UserContext";

import Auth from "./hoc/Auth/Auth";
import Main from "./hoc/Main/Main";
import MainTitle from "./hoc/MainTitle/MainTitle";

import styles from "./App.module.scss";
import Toolbar from "./components/Navigation/Toolbar/Toolbar";
import Login from "./views/Login/Login";
import ForgottenPassword from "./views/ForgottenPassword/ForgottenPassword";
import RequestHistory from "./views/RequestHistory/RequestHistory";
import Policy from "./views/Policy/Policy";
import Confirm from "./views/Confirm/Confirm";
import ResetPassword from "./views/ResetPassword/ResetPassword";
import Users from "./views/Users/Users";

const App = () => {
	const { currentUser } = useContext(UserContext);

	const routes = (
		<Switch>
			<Route path={["/login", "/reset", "/confirm", "/forgot-password"]}>
				<Redirect to="/request-history" />
			</Route>

			{/* <Route path="/">
				<Redirect to="/request-history" />
			</Route> */}

			<Route path="/analytics">
				<MainTitle title="Analytics"/>
				<Main>
					<div>Analytics</div>
				</Main>
			</Route>

			<Route path="/request-history" component={RequestHistory} />

			<Route path="/policy" component={Policy} />

			<Route path="/users" component={Users}/>

			<Route path="/file-drop">
				<MainTitle title="File Drop"/>
				<Main>
					<div>File Drop</div>
				</Main>
			</Route>
		</Switch>
	);

	return (
		<div className={styles.app}>
			<Router>
				{!currentUser && (
					<Auth>
						<Switch>
							<Route path="/confirm" component={Confirm} />
							<Route path="/forgot-password" component={ForgottenPassword} />
							<Route path="/reset" component={ResetPassword} />
							<Route path="/login" component={Login} exact />
							<Redirect to="/login" />
						</Switch>
					</Auth>
				)}

				{currentUser && (
					<div className={styles.mainContainer}>
						{routes}
						<Toolbar />
					</div>
				)}
			</Router>
		</div>
	);
};

export default App;
