import React, { useEffect, useState } from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@material-ui/core";
import Checkbox from "../../../../components/UI/Checkbox/Checkbox";
import Badge from "../../../../components/UI/Badge/Badge";

import classes from "../FileInfo.module.scss";

export interface TransactionDetailsProps {
    analysisReport: any
}

const TransactionDetails = (props: TransactionDetailsProps) => {
    const [blockExpanded, setBlockExpanded] = useState({
        issue: false,
        sanitisation: false,
        remedy: false,
        policyDetails: false,
    });

    const [issueItems, setIssueItems] = useState({
        itemCount: 0,
        issues: []
    });

    const [remedyItems, setRemedyItems] = useState({
        itemCount: 0,
        remedies: []
    });

    const [sanitisationItems, setSanitisationItems] = useState({
        itemCount: 0,
        sanitisations: []
    });

    const clsBlockExpandend = [classes.block];

    useEffect(() => {
        props.analysisReport.documentStatistics.contentGroups.contentGroup.forEach((content: any) => {
            if (content.issueItems.itemCount > 0) {
                setIssueItems((prev: any) => {
                    return {
                        itemCount: prev.itemCount + content.issueItems.itemCount,
                        issues: prev.issues.concat(content.issueItems.issueItem)
                    };
                });
            }

            if (content.remedyItems.itemCount > 0) {
                setRemedyItems((prev: any) => {
                    return {
                        itemCount: prev.itemCount + content.remedyItems.itemCount,
                        remedies: prev.remedies.concat(content.remedyItems.remedyItem)
                    };
                });
            }

            if (content.sanitisationItems.itemCount > 0) {
                setSanitisationItems((prev: any) => {
                    return {
                        itemCount: prev.itemCount + content.sanitisationItems.itemCount,
                        sanitisations: prev.sanitisations.concat(content.sanitisationItems.sanitisationItem)
                    };
                });
            }
        })
    }, [props]);

    return (
        <>
            {issueItems.itemCount > 0 &&
                <div className={clsBlockExpandend.join(" ")}>
                    Issue Items
                    {!blockExpanded.issue && (
                        <Badge value={issueItems.itemCount.toString()} externalStyles={classes.badge} />
                    )}
                    <div className={classes.wrapArrow}>
                        <Checkbox
                            id="span-issue"
                            onHandleChange={() =>
                                setBlockExpanded((prevState) => ({
                                    ...prevState,
                                    issue: !prevState.issue,
                                }))
                            }
                            checkboxIcon={<span className={classes.arrow} />}
                            checkedIcon={
                                <span className={[classes.arrow, classes.rotate].join(" ")} />
                            }
                        />
                    </div>
                    {blockExpanded.issue && (
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Issue</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Count</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {issueItems.issues.map(issue => {
                                    return (
                                        <TableRow key={issue.issueId}>
                                            <TableCell>{issue.issueId}</TableCell>
                                            <TableCell>{issue.technicalDescription}</TableCell>
                                            <TableCell>{issue.instanceCount}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    )}
                </div>
            }

            {remedyItems.itemCount > 0 &&
                <div className={classes.block}>
                    Remedy Items
                    {!blockExpanded.remedy && (
                        <Badge value={remedyItems.itemCount.toString()} externalStyles={classes.badge} />
                    )}
                    <div className={classes.wrapArrow}>
                        <Checkbox
                            id="span-remedy"
                            onHandleChange={() =>
                                setBlockExpanded((prevState) => ({
                                    ...prevState,
                                    remedy: !prevState.remedy,
                                }))
                            }
                            checkboxIcon={<span className={classes.arrow} />}
                            checkedIcon={
                                <span className={[classes.arrow, classes.rotate].join(" ")} />
                            }
                        />
                    </div>
                    {blockExpanded.remedy && (
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Count</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {remedyItems.remedies.map((remedy: any) => {
                                    return (
                                        <TableRow key={remedy.technicalDescription}>
                                            <TableCell>{remedy.technicalDescription}</TableCell>
                                            <TableCell>{remedy.instanceCount}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    )}
                </div>
            }

            {sanitisationItems.itemCount > 0 &&
                <div className={classes.block}>
                    Sanitisation Items
                    {!blockExpanded.sanitisation && (
                        <Badge value={sanitisationItems.itemCount.toString()} externalStyles={classes.badge} />
                    )}
                    <div className={classes.wrapArrow}>
                        <Checkbox
                            id="span-sanitisation"
                            onHandleChange={() =>
                                setBlockExpanded((prevState) => ({
                                    ...prevState,
                                    sanitisation: !prevState.sanitisation,
                                }))
                            }
                            checkboxIcon={<span className={classes.arrow} />}
                            checkedIcon={
                                <span className={[classes.arrow, classes.rotate].join(" ")} />
                            }
                        />
                    </div>
                    {blockExpanded.sanitisation && (
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Issue</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Count</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sanitisationItems.sanitisations.map((sanitisation: any) => {
                                    return (
                                        <TableRow key={sanitisation.sanitisationId}>
                                            <TableCell>{sanitisation.sanitisationId}</TableCell>
                                            <TableCell>{sanitisation.technicalDescription}</TableCell>
                                            <TableCell>{sanitisation.instanceCount}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    )}
                </div>
            }
        </>

    )
}

export default TransactionDetails;