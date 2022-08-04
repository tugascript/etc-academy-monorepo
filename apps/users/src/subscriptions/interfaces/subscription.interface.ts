import { IBase } from 'app/common/interfaces';
import { SubscriptionTypeEnum } from '../enums/subscription-type.enum';
import { InstitutionEntity } from '../../institutions/entities/institution.entity';

export interface ISubscription extends IBase {
  stripeId: string;
  subscriptionType: SubscriptionTypeEnum;
  institution: InstitutionEntity;
  active: boolean;
  cancelled: boolean;
  startDate: Date;
  endDate?: Date;
}
