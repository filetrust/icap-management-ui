import React from "react";
import { ContentManagementFlagAction } from "../../../../../../../src/common/models/enums/ContentManagementFlagAction";
import { PdfContentFlags } from "../../../../../../../src/common/models/PolicyManagementService/Policy/AdaptationPolicy/ContentFlags/PdfContentFlags";
import RadioButton from "../../../../../components/UI/RadioButton/RadioButton";

export interface PdfContentManagementFlagsProps {
    initialPdfContentFlags: PdfContentFlags,
    updatePdfContentFlags: (initialPdfContentFlags: PdfContentFlags) => void,
    currentPdfContentFlags: PdfContentFlags,
    allDisabled?: boolean
}

const PdfContentManagementFlags = (props: PdfContentManagementFlagsProps) => {
    const { initialPdfContentFlags, updatePdfContentFlags, currentPdfContentFlags } = props;

    const updateContentFlagAction = (flagActionName: string) => {
        const newContentAction = initialPdfContentFlags[flagActionName as keyof PdfContentFlags]
            === ContentManagementFlagAction.Disallow ?
            ContentManagementFlagAction.Sanitise :
            ContentManagementFlagAction.Disallow;

        updatePdfContentFlags({
            ...initialPdfContentFlags,
            [flagActionName]: newContentAction
        });
    }

    const pdfContentFlagToggles = [
        {
            id: "pdfAcroform",
            name: "Acroform",
            position: initialPdfContentFlags.acroform as number,
            changed: initialPdfContentFlags.acroform !== currentPdfContentFlags.acroform,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("acroform")
        },
        {
            id: "pdfActionsAll",
            name: "ActionsAll",
            position: initialPdfContentFlags.actionsAll as number,
            changed: initialPdfContentFlags.actionsAll !== currentPdfContentFlags.actionsAll,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("actionsAll")
        },
        {
            id: "pdfEmbeddedFiles",
            name: "Embedded Files",
            position: initialPdfContentFlags.embeddedFiles as number,
            changed: initialPdfContentFlags.embeddedFiles !== currentPdfContentFlags.embeddedFiles,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("embeddedFiles")
        },
        {
            id: "pdfEmbeddedImages",
            name: "Embedded Images",
            position: initialPdfContentFlags.embeddedImages as number,
            changed: initialPdfContentFlags.embeddedImages !== currentPdfContentFlags.embeddedImages,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("embeddedImages")
        },
        {
            id: "pdfExternalHyperlinks",
            name: "External Hyperlinks",
            position: initialPdfContentFlags.externalHyperlinks as number,
            changed: initialPdfContentFlags.externalHyperlinks !== currentPdfContentFlags.externalHyperlinks,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("externalHyperlinks")
        },
        {
            id: "pdfInternalHyperlinks",
            name: "Internal Hyperlinks",
            position: initialPdfContentFlags.internalHyperlinks as number,
            changed: initialPdfContentFlags.internalHyperlinks !== currentPdfContentFlags.internalHyperlinks,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("internalHyperlinks")
        },
        {
            id: "pdfJavascript",
            name: "Javascript",
            position: initialPdfContentFlags.javascript as number,
            changed: initialPdfContentFlags.javascript !== currentPdfContentFlags.javascript,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("javascript")
        },
        {
            id: "pdfMetadata",
            name: "Metadata",
            position: initialPdfContentFlags.metadata as number,
            changed: initialPdfContentFlags.metadata !== currentPdfContentFlags.metadata,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("metadata")
        }
    ];


    return (
        <>
            {pdfContentFlagToggles.map(toggle => {
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

export default PdfContentManagementFlags;