import { ArgumentException } from "../../errors/errors";
import { Policy } from "../Policy/Policy";

export class PolicyHistory {
    policiesCount: number;
    policies: Policy[];

    constructor(policiesCount: number, policies: Policy[]) {
        if (policiesCount > 0 && policies.length < 1) {
            throw new ArgumentException("policies", "policiesCount was above 0, but no policies were found");
        }

        this.policiesCount = policiesCount;
        this.policies = policies;
    }
}