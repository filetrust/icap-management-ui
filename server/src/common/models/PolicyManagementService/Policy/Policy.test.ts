import { PolicyType } from "../../enums/PolicyType";
import { AdaptionPolicy } from "./AdaptationPolicy/AdaptionPolicy";
import { NcfsPolicy } from "./NcfsPolicy/NcfsPolicy";
import { Policy } from "./Policy";


describe("Policy", () => {
    const testDate = new Date().toDateString();

    const testPolicy = {
        id: "testId",
        policyType: PolicyType.Current,
        published: testDate,
        lastEdited: testDate,
        created: testDate,
        ncfsPolicy: {} as NcfsPolicy,
        adaptionPolicy: {} as AdaptionPolicy
    };

    describe("constructor", () => {
        it("should_construct_with_valid_arguments", () => {
            // Act
            const policy = new Policy(
                testPolicy.id,
                testPolicy.policyType,
                testPolicy.published,
                testPolicy.lastEdited,
                testPolicy.created,
                testPolicy.ncfsPolicy,
                testPolicy.adaptionPolicy
            );

            // Assert
            expect(policy.id).toEqual(testPolicy.id);
        });
    });
});