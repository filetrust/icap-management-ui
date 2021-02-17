import React from "react";

import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@material-ui/core";
import RoutesForNonCompliantFiles from "../../../Policy/common/RoutesForNonCompliantFiles/RoutesForNonCompliantFiles";
import PolicyForNonCompliantFiles from "../../../Policy/common/PolicyForNonCompliantFiles/PolicyForNonCompliantFiles";
import { AdaptionPolicy } from "../../../../../../src/common/models/PolicyManagementService/Policy/AdaptationPolicy/AdaptionPolicy";

import classes from "../FileInfo.module.scss";

export interface ActiveAdaptationPolicyProps {
    id: string,
    published: Date,
    updatedBy: string,
    adaptationPolicy: AdaptionPolicy
}

const ActiveNcfsPolicy = (props: ActiveAdaptationPolicyProps) => {
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

            <RoutesForNonCompliantFiles
                ncfsRoutingUrl={props.adaptationPolicy.ncfsRoute ?
                    props.adaptationPolicy.ncfsRoute.ncfsRoutingUrl : ""}
                currentPolicyRoutingUrl={props.adaptationPolicy.ncfsRoute.ncfsRoutingUrl}
                disabled />

            <PolicyForNonCompliantFiles
                ncfsActions={props.adaptationPolicy.ncfsActions}
                disabled />
        </>
    );
}

export default ActiveNcfsPolicy;