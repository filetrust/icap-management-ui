import React from "react";
import { ContentManagementFlagAction } from "../../../../../../../src/common/models/enums/ContentManagementFlagAction";
import { ExcelContentFlags } from "../../../../../../../src/common/models/PolicyManagementService/Policy/AdaptationPolicy/ContentFlags/ExcelContentFlags";
import RadioButton from "../../../../../components/UI/RadioButton/RadioButton";

export interface ExcelContentManagementFlagsProps {
    initialExcelContentFlags: ExcelContentFlags,
    updateExcelContentFlags: (initialExcelContentFlags: ExcelContentFlags) => void,
    currentExcelContentFlags: ExcelContentFlags,
    allDisabled?: boolean
}

const ExcelContentManagementFlags = (props: ExcelContentManagementFlagsProps) => {
    const {initialExcelContentFlags, updateExcelContentFlags, currentExcelContentFlags } = props;

    const updateContentFlagAction = (flagActionName: string) => {
        const newContentAction = initialExcelContentFlags[flagActionName as keyof ExcelContentFlags]
                === ContentManagementFlagAction.Disallow ?
                ContentManagementFlagAction.Sanitise :
                ContentManagementFlagAction.Disallow;

        updateExcelContentFlags({
            ...initialExcelContentFlags,
            [flagActionName]: newContentAction
        });
    }

    const excelContentFlagToggles = [
        {
            id: "excelDynamicDataExchange",
            name: "Dynamic Data Exchange",
            position: initialExcelContentFlags.dynamicDataExchange as number,
            changed: initialExcelContentFlags.dynamicDataExchange !== currentExcelContentFlags.dynamicDataExchange,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("dynamicDataExchange")
        },
        {
            id: "excelEmbeddedFiles",
            name: "Embedded Files",
            position: initialExcelContentFlags.embeddedFiles as number,
            changed: initialExcelContentFlags.embeddedFiles !== currentExcelContentFlags.embeddedFiles,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("embeddedFiles")
        },
        {
            id: "excelEmbeddedImages",
            name: "Embedded Images",
            position: initialExcelContentFlags.embeddedImages as number,
            changed: initialExcelContentFlags.embeddedImages !== currentExcelContentFlags.embeddedImages,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("embeddedImages")
        },
        {
            id: "excelExternalHyperlinks",
            name: "External Hyperlinks",
            position: initialExcelContentFlags.externalHyperlinks as number,
            changed: initialExcelContentFlags.externalHyperlinks !== currentExcelContentFlags.externalHyperlinks,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("externalHyperlinks")
        },
        {
            id: "excelInternalHyperlinks",
            name: "Internal Hyperlinks",
            position: initialExcelContentFlags.internalHyperlinks as number,
            changed: initialExcelContentFlags.internalHyperlinks !== currentExcelContentFlags.internalHyperlinks,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("internalHyperlinks")
        },
        {
            id: "excelMacros",
            name: "Macros",
            position: initialExcelContentFlags.macros as number,
            changed: initialExcelContentFlags.macros !== currentExcelContentFlags.macros,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("macros")
        },
        {
            id: "excelMetadata",
            name: "Metadata",
            position: initialExcelContentFlags.metadata as number,
            changed: initialExcelContentFlags.metadata !== currentExcelContentFlags.metadata,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("metadata")
        },
        {
            id: "excelReviewComments",
            name: "Review Comments",
            position: initialExcelContentFlags.reviewComments as number,
            changed: initialExcelContentFlags.reviewComments !== currentExcelContentFlags.reviewComments,
            disabled: props.allDisabled,
            onChange: () => updateContentFlagAction("reviewComments")
        }
    ];


    return (
        <>
            {excelContentFlagToggles.map(toggle => {
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

export default ExcelContentManagementFlags;