import React, { useState } from "react";

import classes from "./Policy.module.scss";

import draftPolicyIcon from "../../assets/svg/policy/draft-policy-icon.svg";
import currentPolicyIcon from "../../assets/svg/policy/current-policy-icon.svg";
import previousPolicyIcon from "../../assets/svg/policy/previous-policy-icon.svg";

import DraftPolicy from "./DraftPolicy/DraftPolicy";
import CurrentPolicy from "./CurrentPolicy/CurrentPolicy";
import History from "./History/History";
import TabNav from "../../components/Tabs/TabNav/TabNav";
import Tab from "../../components/Tabs/Tab/Tab";
import Main from "../../hoc/Main/Main";
import MainTitle from "../../hoc/MainTitle/MainTitle";

import { PolicyState } from "../../context/policy/PolicyState";

const Policy = () => {
	const [selectedTab, setSelectedTab] = useState("Draft");

	const tabs = [
		{ testId: "buttonPolicyDraftTab", name: "Draft", icon: draftPolicyIcon },
		{ testId: "buttonPolicyCurrentTab", name: "Current", icon: currentPolicyIcon },
		{ testId: "buttonPolicyHistoryTab", name: "History", icon: previousPolicyIcon }
	];

	return (
		<PolicyState>
			<MainTitle title="Policy"/>

			<Main>
				<article className={classes.Policy}>
					<TabNav
						tabs={tabs}
						selectedTabName={selectedTab}
						onSetActiveTabHandler={(tab) => setSelectedTab(tab)}>

						<Tab isSelected={selectedTab === "Draft"}>
							<DraftPolicy />
						</Tab>

						<Tab isSelected={selectedTab === "Current"}>
							<CurrentPolicy />
						</Tab>

						<Tab isSelected={selectedTab === "History"}>
							<History />
						</Tab>
					</TabNav>
				</article>
			</Main>
		</PolicyState>
	);
};

export default Policy;
