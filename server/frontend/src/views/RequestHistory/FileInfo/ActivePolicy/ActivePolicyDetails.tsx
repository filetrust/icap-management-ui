import React from "react";

import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@material-ui/core";

import classes from "../FileInfo.module.scss";

export interface ActivePolicyDetailsProps {
    id: string,
    published: Date,
    updatedBy: string
}

const ActivePolicyDetails = (props: ActivePolicyDetailsProps) => {
    return (
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
    );
}

export default ActivePolicyDetails;