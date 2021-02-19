import { Guid } from "guid-typescript";
import React, { useContext } from "react";
import Button from "../../../../components/UI/Button/Button";
import { PolicyContext } from "../../../../context/policy/PolicyContext";

import classes from "./ConfirmDraftDeleteModal.module.scss";

export interface ConfirmDraftDeleteModalProps {
	onCancelHandler: () => void
}

const ConfirmDraftDeleteModal = (props: ConfirmDraftDeleteModalProps) => {
	const {
		draftPolicy,
		deleteDraftPolicy
	} = useContext(PolicyContext);

	const deleteHandler = () => {
		deleteDraftPolicy(Guid.parse(draftPolicy.id));
		props.onCancelHandler();
	};

	return (
		<div className={classes.modalContainer}>
			<header className={classes.header}>
				<h2>Delete Draft Policy - Are you sure?</h2>
			</header>
			<div className={classes.modalInnerContent}>
				<div className={classes.confirmDeleteModalInfo}>
					<p>After confirmation, the 'draft' policy will be deleted and a new one
                        will be created with the same settings as the 'current' policy.
					</p>
				</div>

				<div className={classes.buttons}>
					<Button
						externalStyles={classes.cancelDeleteButton}
						onButtonClick={() => props.onCancelHandler()}
						buttonType="button">
							Cancel
					</Button>
					<Button
						externalStyles={classes.confirmDeleteButton}
						onButtonClick={() => deleteHandler()}
						buttonType="button">
							Delete
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDraftDeleteModal;