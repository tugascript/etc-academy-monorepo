import { Injectable } from '@nestjs/common';
import { CommonService } from 'app/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { AddressEntity } from './entities/address.entity';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressesRepository: EntityRepository<AddressEntity>,
    private readonly commonService: CommonService,
  ) {}
}
