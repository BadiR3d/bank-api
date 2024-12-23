import { SNS } from "aws-sdk";
import { AccountEvent } from "../models/AccountEvent";

export class NotificationService {
  private sns = new SNS({ region: process.env.AWS_REGION });
  private topicArn = process.env.SNS_TOPIC_ARN;

  async notify(event: AccountEvent): Promise<void> {
    const message = JSON.stringify(event);

    await this.sns
      .publish({
        Message: message,
        TopicArn: this.topicArn,
      })
      .promise();
  }
}
