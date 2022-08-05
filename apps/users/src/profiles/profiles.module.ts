import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { EmailModule } from '../email/email.module';
import { UsersModule } from '../users/users.module';
import { InvitationEntity } from './entities/invitation.entity';
import { ProfileRequestEntity } from './entities/profile-request.entity';
import { ProfileEntity } from './entities/profile.entity';
import { ProfilesService } from './profiles.service';
import { InvitationsResolver } from './resolvers/invitations.resolver';
import { ProfileRequestsResolver } from './resolvers/profile-requests.resolver';
import { ProfilesResolver } from './resolvers/profiles.resolver';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      ProfileEntity,
      InvitationEntity,
      ProfileRequestEntity,
    ]),
    UsersModule,
    EmailModule,
  ],
  providers: [
    ProfilesResolver,
    ProfileRequestsResolver,
    InvitationsResolver,
    ProfilesService,
  ],
  exports: [ProfilesService],
})
export class ProfilesModule {}
