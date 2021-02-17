import React from "react";
import { ContentManagementFlagAction } from "../../../../../../../src/common/models/enums/ContentManagementFlagAction";
import { WordContentFlags } from "../../../../../../../src/common/models/PolicyManagementService/Policy/AdaptationPolicy/ContentFlags/WordContentFlags";
import RadioButton from "../../../../../components/UI/RadioButton/RadioButton";

export interface WordContentManagementFlagsProps {
    initialWordContentFlags: WordContentFlags,
    updateWordContentFlags: (initialWordContentFlags: WordContentFlags) => void,
    currentWordContentFlags: WordContentFlags,
    allDisabled?: boolean
}

const WordContentManagementFlags = (props: WordContentManagementFlagsProps) => {
    const { initialWordContentFlags, updateWordContentFlags, currentWordContentFlags } = props;

    const updateContentFlagAction = (flagActionName: string) => {
        const newContentAction = initialWordContentFlags[flagActionName as keyof WordContentFlags]
            === ContentManagementFlagAction.Disallow ?
            ContentManagementFlagAction.Sanitise :
            ContentManagementFlagAction.Disallow;

        updateWordContentFlags({
            ...initialWordContentFlags,
            [flagActionName]: newContentAction
        });
    }

    const wordContentFlagToggles = [
        {
            id: "wordDynamicDataExchange",
            name: "Dynamic Data Exchange",
            position: initialWordContentFlags.dynamicDataExchange as number,
            changed: initialWordContentFlags.dynamicDataExchange !== currentWordContentFlags.dynamicDataExchange,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("dynamicDataExchange")
        },
        {
            id: "wordEmbeddedFiles",
            name: "Embedded Files",
            position: initialWordContentFlags.embeddedFiles as number,
            changed: initialWordContentFlags.embeddedFiles !== currentWordContentFlags.embeddedFiles,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("embeddedFiles")
        },
        {
            id: "wordEmbeddedImages",
            name: "Embedded Images",
            position: initialWordContentFlags.embeddedImages as number,
            changed: initialWordContentFlags.embeddedImages !== currentWordContentFlags.embeddedImages,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("embeddedImages")
        },
        {
            id: "wordExternalHyperlinks",
            name: "External Hyperlinks",
            position: initialWordContentFlags.externalHyperlinks as number,
            changed: initialWordContentFlags.externalHyperlinks !== currentWordContentFlags.externalHyperlinks,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("externalHyperlinks")
        },
        {
            id: "wordInternalHyperlinks",
            name: "Internal Hyperlinks",
            position: initialWordContentFlags.internalHyperlinks as number,
            changed: initialWordContentFlags.internalHyperlinks !== currentWordContentFlags.internalHyperlinks,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("internalHyperlinks")
        },
        {
            id: "wordMacros",
            name: "Macros",
            position: initialWordContentFlags.macros as number,
            changed: initialWordContentFlags.macros !== currentWordContentFlags.macros,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("macros")
        },
        {
            id: "wordMetadata",
            name: "Metadata",
            position: initialWordContentFlags.metadata as number,
            changed: initialWordContentFlags.metadata !== currentWordContentFlags.metadata,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("metadata")
        },
        {
            id: "wordReviewComments",
            name: "Review Comments",
            position: initialWordContentFlags.reviewComments as number,
            changed: initialWordContentFlags.reviewComments !== currentWordContentFlags.reviewComments,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("reviewComments")
        }
    ];


    return (
        <>
            {wordContentFlagToggles.map(toggle => {
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

export default WordContentManagementFlags;