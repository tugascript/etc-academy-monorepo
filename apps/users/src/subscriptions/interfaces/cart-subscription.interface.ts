import { SubscriptionTypeEnum } from '../enums/subscription-type.enum';
import { InstitutionEntity } from '../../institutions/entities/institution.entity';
import { IBase } from 'app/common/interfaces';

export interface ICartSubscription extends IBase {
  subscriptionType: SubscriptionTypeEnum;
  institution: InstitutionEntity;
}
