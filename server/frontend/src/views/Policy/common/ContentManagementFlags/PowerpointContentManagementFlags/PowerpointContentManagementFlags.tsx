import React from "react";
import { ContentManagementFlagAction } from "../../../../../../../src/common/models/enums/ContentManagementFlagAction";
import { PowerpointContentFlags } from "../../../../../../../src/common/models/PolicyManagementService/Policy/AdaptationPolicy/ContentFlags/PowerpointContentFlags";
import RadioButton from "../../../../../components/UI/RadioButton/RadioButton";

export interface PowerpointContentManagementFlagsProps {
    initialPowerpointContentFlags: PowerpointContentFlags,
    updatePowerpointContentFlags: (initialPowerpointContentFlags: PowerpointContentFlags) => void,
    currentPowerPointContentFlags: PowerpointContentFlags,
    allDisabled?: boolean
}

const PowerpointContentManagementFlags = (props: PowerpointContentManagementFlagsProps) => {
    const { initialPowerpointContentFlags, updatePowerpointContentFlags, currentPowerPointContentFlags } = props;

    const updateContentFlagAction = (flagActionName: string) => {
        const newContentAction = initialPowerpointContentFlags[flagActionName as keyof PowerpointContentFlags]
            === ContentManagementFlagAction.Disallow ?
            ContentManagementFlagAction.Sanitise :
            ContentManagementFlagAction.Disallow;

        updatePowerpointContentFlags({
            ...initialPowerpointContentFlags,
            [flagActionName]: newContentAction
        });
    }

    const powerpointContentFlagToggles = [
        {
            id: "powerpointEmbeddedFiles",
            name: "Embedded Files",
            position: initialPowerpointContentFlags.embeddedFiles as number,
            changed: initialPowerpointContentFlags.embeddedFiles !== currentPowerPointContentFlags.embeddedFiles,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("embeddedFiles")
        },
        {
            id: "powerpointEmbeddedImages",
            name: "Embedded Images",
            position: initialPowerpointContentFlags.embeddedImages as number,
            changed: initialPowerpointContentFlags.embeddedImages !== currentPowerPointContentFlags.embeddedImages,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("embeddedImages")
        },
        {
            id: "powerpointExternalHyperlinks",
            name: "External Hyperlinks",
            position: initialPowerpointContentFlags.externalHyperlinks as number,
            changed: initialPowerpointContentFlags.externalHyperlinks !== currentPowerPointContentFlags.externalHyperlinks,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("externalHyperlinks")
        },
        {
            id: "powerpointInternalHyperlinks",
            name: "Internal Hyperlinks",
            position: initialPowerpointContentFlags.internalHyperlinks as number,
            changed: initialPowerpointContentFlags.internalHyperlinks !== currentPowerPointContentFlags.internalHyperlinks,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("internalHyperlinks")
        },
        {
            id: "powerpointMacros",
            name: "Macros",
            position: initialPowerpointContentFlags.macros as number,
            changed: initialPowerpointContentFlags.macros !== currentPowerPointContentFlags.macros,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("macros")
        },
        {
            id: "powerpointMetadata",
            name: "Metadata",
            position: initialPowerpointContentFlags.metadata as number,
            changed: initialPowerpointContentFlags.metadata !== currentPowerPointContentFlags.metadata,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("metadata")
        },
        {
            id: "powerpointReviewComments",
            name: "Review Comments",
            position: initialPowerpointContentFlags.reviewComments as number,
            changed: initialPowerpointContentFlags.reviewComments !== currentPowerPointContentFlags.reviewComments,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("reviewComments")
        }
    ];

    return (
        <>
            {powerpointContentFlagToggles.map(toggle => {
                return (
                    <RadioButton
                        key={toggle.id}
                        block={toggle.name}
                        buttonName={toggle.name}
                        buttonId={toggle.id}
                        position={toggle.position}
                        onChangeHandler={toggle.onChange}
                        changed={toggle.changed}
                        disabled={toggle.disabled} />
                )
            })}
        </>
    );
}

export default PowerpointContentManagementFlags;