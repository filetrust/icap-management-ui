import { ContentManagementFlagAction } from "../../../../../../src/common/models/enums/ContentManagementFlagAction";

export interface WordContentFlags {
    dynamicDataExchange: ContentManagementFlagAction,
    embeddedFiles: ContentManagementFlagAction,
    embeddedImages: ContentManagementFlagAction,
    externalHyperlinks: ContentManagementFlagAction,
    internalHyperlinks: ContentManagementFlagAction,
    macros: ContentManagementFlagAction,
    metadata: ContentManagementFlagAction,
    reviewComments: ContentManagementFlagAction
}