import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { OnboardConstruct } from "./onboard-construct";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class QueueManagerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new cdk.aws_dynamodb.Table(this, "waiting-table", {
      billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: "id", type: cdk.aws_dynamodb.AttributeType.STRING },
    });

    new OnboardConstruct(this, "Onboard", table);
  }
}
