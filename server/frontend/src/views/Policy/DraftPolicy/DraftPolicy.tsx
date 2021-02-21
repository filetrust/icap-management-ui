import React, { useContext, useState } from "react";
import equal from "deep-equal";
import TabNav from "../../../components/Tabs/TabNav/TabNav";
import Tab from "../../../components/Tabs/Tab/Tab";
import ContentManagementFlags from "../common/ContentManagementFlags/ContentManagementFlags";
import RoutesForNonCompliantFiles from "../common/Ncfs/RoutesForNonCompliantFiles/RoutesForNonCompliantFiles";
import PolicyForNonCompliantFiles from "../common/Ncfs/PolicyForNonCompliantFiles/PolicyForNonCompliantFiles";
import ReferenceNcfs from "../common/Ncfs/ReferenceNcfs/ReferenceNcfs";
import { ContentFlags } from "../../../../../src/common/models/PolicyManagementService/Policy/AdaptationPolicy/ContentFlags/ContentFlags";
import { NcfsActions } from "../../../../../src/common/models/PolicyManagementService/Policy/NcfsPolicy/NcfsActions";
import { NcfsRoute } from "../../../../../src/common/models/PolicyManagementService/Policy/NcfsPolicy/NcfsRoute";
import { PolicyContext } from "../../../context/policy/PolicyContext";
import Button from "../../../components/UI/Button/Button";
import Modal from "../../../components/UI/Modal/Modal";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";
import ConfirmDraftPublishModal from "./ConfirmDraftPublishModal/ConfirmDraftPublishModal";
import ConfirmDraftDeleteModal from "./ConfirmDraftDeleteModal/ConfirmDraftDeleteModal";
import UnsavedChangesPrompt from "../common/UnsavedChangesPrompt/UnsavedChangesPrompt";

import classes from "./DraftPolicy.module.scss";

const returnNcfsRoutingUrl = (ncfsRoutes: NcfsRoute) => ncfsRoutes ? ncfsRoutes.ncfsRoutingUrl : null;

const DraftPolicy = () => {
	const {
		isPolicyChanged,
		newDraftPolicy,
		currentPolicy,
		status,
		setNewDraftPolicy,
		saveDraftChanges,
		cancelDraftChanges,
	} = useContext(PolicyContext);

	const [selectedTab, setSelectedTab] = useState("Adaptation Policy");
	const [showPublishModal, setShowPublishModal] = useState(false);
	const [showDeleteModal, setshowDeleteModal] = useState(false);

	const tabs = [
		{ testId: "buttonCurrentAdaptationPolicyTab", name: "Adaptation Policy" },
		{ testId: "buttonCurrentNcfsPolicyTab", name: "NCFS Policy" },
		{ testId: "buttonReferenceNcfsTab", name: "Reference NCFS" }
	];

	const closePublishModal = () => setShowPublishModal(false);

	const closeDeleteModal = () => setshowDeleteModal(false);

	const updateContentManagementFlags = (newContentFlags: ContentFlags) => {
		setNewDraftPolicy({
			...newDraftPolicy,
			adaptionPolicy: {
				...newDraftPolicy.adaptionPolicy,
				contentManagementFlags: newContentFlags
			}
		});
	};

	const updateNcfsRoute = (newRoutingUrl: string) => {
		setNewDraftPolicy({
			...newDraftPolicy,
			adaptionPolicy: {
				...newDraftPolicy.adaptionPolicy,
				ncfsRoute: {
					ncfsRoutingUrl: newRoutingUrl,
					isDeleted: false,
					isValidated: false
				}
			}
		});
	};

	const updateNcfsActions = (newActions: NcfsActions) => {
		setNewDraftPolicy({
			...newDraftPolicy,
			adaptionPolicy: {
				...newDraftPolicy.adaptionPolicy,
				ncfsActions: {
					glasswallBlockedFilesAction: newActions.glasswallBlockedFilesAction,
					unprocessableFileTypeAction: newActions.unprocessableFileTypeAction
				}
			}
		});
	};

	const updateReferenceNcfsActions = (newActions: NcfsActions) => {
		setNewDraftPolicy({
			...newDraftPolicy,
			ncfsPolicy: {
				...newDraftPolicy.ncfsPolicy,
				ncfsActions: {
					glasswallBlockedFilesAction: newActions.glasswallBlockedFilesAction,
					unprocessableFileTypeAction: newActions.unprocessableFileTypeAction
				}
			}
		});
	};

	const showPublishButton = () => {
		const draft = {
			adaptionPolicy: {
				...newDraftPolicy.adaptionPolicy,
				ncfsRoute: returnNcfsRoutingUrl(newDraftPolicy.adaptionPolicy.ncfsRoute)
			},
			...newDraftPolicy.ncfsPolicy,
		};

		const current = {
			adaptionPolicy: {
				...currentPolicy.adaptionPolicy,
				ncfsRoute: returnNcfsRoutingUrl(currentPolicy.adaptionPolicy.ncfsRoute)
			},
			...currentPolicy.ncfsPolicy
		};

		return !isPolicyChanged && !equal(draft, current);
	};

	const saveCancelButtons = (
		<div className={classes.buttons}>
			<Button
				externalStyles={classes.cancelButton}
				onButtonClick={() => cancelDraftChanges()}
				buttonType="button">
				Cancel Changes
			</Button>
			<Button
				externalStyles={classes.saveButton}
				onButtonClick={() => saveDraftChanges()}
				buttonType="button">
				Save Changes
			</Button>
		</div>
	);

	const publishDeleteButtons = (
		<div className={classes.buttons}>
			<Button
				externalStyles={classes.deleteButton}
				onButtonClick={() => setshowDeleteModal(true)}
				buttonType="button">
				Delete
			</Button>
			<Button
				externalStyles={classes.publishButton}
				onButtonClick={() => setShowPublishModal(true)}
				buttonType="button">
				Publish
			</Button>
		</div>
	);

	const ncfsActionsDescriptions = (
		<>
			<div>
				<h3>
					<strong>Un-Processable File Types</strong>{" "}
				</h3>
				<p>
					When the filetype of the original file is identified as one that
					the Glasswall SDK cannot rebuild.
				</p>
			</div>
			<div>
				<h3>
					<strong>Glasswall Blocked Files</strong>
				</h3>
				<p>The original file cannot be rebuilt by the Glasswall SDK</p>
			</div>
		</>
	);

	return (
		<div className={classes.Draft}>
			{status === "LOADING" &&
				<div>Loading...</div>
			}

			{status === "ERROR" &&
				<div>Error getting Policy data.</div>
			}

			{status === "LOADED" &&
				<>
					<UnsavedChangesPrompt
						when={isPolicyChanged}
						message="You have unsaved changes, are you sure you want to leave the page?" />

					<TabNav
						tabs={tabs}
						selectedTabName={selectedTab}
						onSetActiveTabHandler={(tab) => setSelectedTab(tab)}>

						<div className={classes.innerContent}>
							<Tab isSelected={selectedTab === "Adaptation Policy"} externalStyles={classes.Tab}>
								<h2 className={classes.head}>
									<div className={classes.header}>
										Content Management Flags
										{isPolicyChanged && <>{saveCancelButtons}</>}
										{showPublishButton() && publishDeleteButtons}
									</div>
								</h2>
								<ContentManagementFlags
									contentManagementFlags={newDraftPolicy.adaptionPolicy.contentManagementFlags}
									currentPolicyContentManagementFlags={currentPolicy.adaptionPolicy.contentManagementFlags}
									updateContentFlags={updateContentManagementFlags} />
							</Tab>

							<Tab isSelected={selectedTab === "NCFS Policy"} externalStyles={classes.Tab}>
								<h2 className={classes.head}>
									<div className={classes.header}>
										Config for non-compliant files
										{isPolicyChanged && <>{saveCancelButtons}</>}
										{showPublishButton() && publishDeleteButtons}
									</div>
								</h2>
								<div className={classes.ncfsContainer}>
									<section className={classes.info}>
										{ncfsActionsDescriptions}
									</section>
									<RoutesForNonCompliantFiles
										ncfsRoutingUrl={returnNcfsRoutingUrl(newDraftPolicy.adaptionPolicy.ncfsRoute)}
										currentPolicyRoutingUrl={returnNcfsRoutingUrl(currentPolicy.adaptionPolicy.ncfsRoute)}
										changeInput={updateNcfsRoute} />

									<PolicyForNonCompliantFiles
										ncfsActions={newDraftPolicy.adaptionPolicy.ncfsActions}
										currentNcfsActions={currentPolicy.adaptionPolicy.ncfsActions}
										updateNcfsActions={updateNcfsActions} />
								</div>
							</Tab>

							<Tab isSelected={selectedTab === "Reference NCFS"} externalStyles={classes.Tab}>
								<h2 className={classes.head}>
									<div className={classes.header}>
										Reference NCFS Actions
										{isPolicyChanged && <>{saveCancelButtons}</>}
										{showPublishButton() && publishDeleteButtons}
									</div>
								</h2>
								<div className={classes.ncfsContainer}>
									<section className={classes.info}>
										{ncfsActionsDescriptions}
									</section>

									<ReferenceNcfs
										ncfsActions={newDraftPolicy.ncfsPolicy.ncfsActions}
										currentNcfsActions={currentPolicy.ncfsPolicy.ncfsActions === null ? newDraftPolicy.ncfsPolicy.ncfsActions : currentPolicy.ncfsPolicy.ncfsActions}
										updateNcfsActions={updateReferenceNcfsActions} />
								</div>
							</Tab>
						</div>
					</TabNav>

					{showPublishModal &&
						<>
							<Modal onCloseHandler={closePublishModal} externalStyles={classes.modal}>
								<ConfirmDraftPublishModal onCancelHandler={closePublishModal} />
							</Modal>
							<Backdrop onClickOutside={closePublishModal} />
						</>
					}

					{showDeleteModal &&
						<>
							<Modal onCloseHandler={closeDeleteModal} externalStyles={classes.modal}>
								<ConfirmDraftDeleteModal onCancelHandler={closeDeleteModal} />
							</Modal>
							<Backdrop onClickOutside={closeDeleteModal} />
						</>
					}
				</>
			}
		</div >
	);
};

export default DraftPolicy;