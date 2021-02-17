import React from "react";

import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@material-ui/core";
import ContentManagementFlags from "../../../Policy/common/ContentManagementFlags/ContentManagementFlags";
import { AdaptionPolicy } from "../../../../../../src/common/models/PolicyManagementService/Policy/AdaptationPolicy/AdaptionPolicy";

import classes from "../FileInfo.module.scss";

export interface ActiveContentManagementFlagsProps {
    id: string,
    published: Date,
    updatedBy: string,
    adaptationPolicy: AdaptionPolicy
}

const ActiveContentManagementFlags = (props: ActiveContentManagementFlagsProps) => {
    return (
        <>
            <Table className={classes.table} id={props.id}>
                <TableHead>
                    <TableRow>
                        <TableCell>Published</TableCell>
                        <TableCell>Last Updated By</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className={classes.tbody}>
                    <TableRow>
                        <TableCell>
                            {new Date(props.published).toLocaleString()}
                        </TableCell>
                        <TableCell>
                            {props.updatedBy ? props.updatedBy : "N/A"}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <ContentManagementFlags
                contentManagementFlags={props.adaptationPolicy.contentManagementFlags}
                currentPolicyContentManagementFlags={props.adaptationPolicy.contentManagementFlags}
                disabled />
        </>
    );
}

export default ActiveContentManagementFlags;