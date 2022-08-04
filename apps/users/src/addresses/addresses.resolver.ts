import { Resolver } from '@nestjs/graphql';
import { AddressesService } from './addresses.service';

@Resolver()
export class AddressesResolver {
  constructor(private readonly addressesService: AddressesService) {}
}
