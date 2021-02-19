import { Guid } from "guid-typescript";
import React, { useContext } from "react";
import Button from "../../../../components/UI/Button/Button";
import { PolicyContext } from "../../../../context/policy/PolicyContext";

import classes from "./ConfirmDraftPublishModal.module.scss";

export interface ConfirmDraftPublishModalProps {
	onCancelHandler: () => void
}

const ConfirmDraftPublishModal = (props: ConfirmDraftPublishModalProps) => {
	const {
		draftPolicy,
		publishPolicy
	} = useContext(PolicyContext);

	const publish = () => {
		publishPolicy(Guid.parse(draftPolicy.id));
		props.onCancelHandler();
	};

	return (
		<div className={classes.modalContainer}>
			<header className={classes.header}>
				<h2>Publish Draft Policy - Are you sure?</h2>
			</header>
			<div className={classes.modalInnerContent}>
				<div className={classes.confirmPublishModalInfo}>
					<p>After confirmation, the 'draft' policy will be published.
                        This becomes the new master policy, and will be applied to all future requests.
					</p>
				</div>

				<div className={classes.buttons}>
					<Button
						externalStyles={classes.cancelPublishButton}
						onButtonClick={() => props.onCancelHandler()}
						buttonType="button">
							Cancel
					</Button>
					<Button
						externalStyles={classes.confirmPublishButton}
						onButtonClick={() => publish()}
						buttonType="button">
							Publish
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDraftPublishModal;