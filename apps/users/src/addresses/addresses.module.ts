import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ProfilesModule } from '../profiles/profiles.module';
import { AddressesResolver } from './addresses.resolver';
import { AddressesService } from './addresses.service';
import { AddressEntity } from './entities/address.entity';

@Module({
  imports: [MikroOrmModule.forFeature([AddressEntity]), ProfilesModule],
  providers: [AddressesResolver, AddressesService],
  exports: [AddressesService],
})
export class AddressesModule {}
