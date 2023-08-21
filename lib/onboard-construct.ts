import { Construct } from "constructs";
import { ApiGatewayToLambda } from "@aws-solutions-constructs/aws-apigateway-lambda";
import { getHandlerManifestPath } from "./helpers/get-manifest-path";
import { HandlerNames } from "./enums/runtime";
import { aws_dynamodb } from "aws-cdk-lib";
import { RustFunction } from "cargo-lambda-cdk";

export class OnboardConstruct extends Construct {
  constructor(scope: Construct, id: string, table: aws_dynamodb.Table) {
    super(scope, id);

    const handler = new RustFunction(this, HandlerNames.onboard, {
      manifestPath: getHandlerManifestPath(HandlerNames.onboard),
      bundling: {
        commandHooks: {
          beforeBundling(_inputDir: string, _outputDir: string): string[] {
            return ["cargo test"];
          },
          afterBundling(_inputDir: string, _outputDir: string): string[] {
            return [];
          },
        },
      },
    });
    new ApiGatewayToLambda(this, "handler-api", {
      existingLambdaObj: handler,
    });

    table.grantReadWriteData(handler).assertSuccess();
  }
}
