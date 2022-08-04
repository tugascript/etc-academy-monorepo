import { Resolver } from '@nestjs/graphql';
import { SubscriptionsService } from './subscriptions.service';

@Resolver()
export class SubscriptionsResolver {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}
}
