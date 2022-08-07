import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AddressesModule } from '../addresses/addresses.module';
import { ProfilesModule } from '../profiles/profiles.module';
import { InstitutionEntity } from './entities/institution.entity';
import { InstitutionsResolver } from './institutions.resolver';
import { InstitutionsService } from './institutions.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([InstitutionEntity]),
    ProfilesModule,
    AddressesModule,
  ],
  providers: [InstitutionsResolver, InstitutionsService],
  exports: [InstitutionsService],
})
export class InstitutionsModule {}
