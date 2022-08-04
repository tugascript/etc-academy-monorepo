import { Resolver } from '@nestjs/graphql';
import { InstitutionsService } from './institutions.service';

@Resolver()
export class InstitutionsResolver {
  constructor(private readonly institutionsService: InstitutionsService) {}
}
