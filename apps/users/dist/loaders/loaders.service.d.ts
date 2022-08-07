import { EntityManager } from '@mikro-orm/postgresql';
import { MercuriusContext } from 'mercurius';
import { CommonService } from 'src/common';
import { FilterRelationDto } from 'src/common/dtos';
import { ILoader, IPaginated } from 'src/common/interfaces';
import { AddressEntity } from '../addresses/entities/address.entity';
import { InstitutionEntity } from '../institutions/entities/institution.entity';
import { InvitationEntity } from '../profiles/entities/invitation.entity';
import { ProfileRequestEntity } from '../profiles/entities/profile-request.entity';
import { ProfileEntity } from '../profiles/entities/profile.entity';
import { UserEntity } from '../users/entities/user.entity';
import { IAddressReference } from './interfaces/address-reference.interface';
import { IInstitutionReference } from './interfaces/institution-reference.interface';
import { IInvitationReference } from './interfaces/invitation-reference.interface';
import { IProfileReference } from './interfaces/profile-reference.interface';
import { IProfileRequestReference } from './interfaces/profile-request-reference.interface';
import { IUserReference } from './interfaces/user-reference.interface';
export declare class LoadersService {
    private readonly em;
    private readonly commonService;
    constructor(em: EntityManager, commonService: CommonService);
    private static getEntities;
    private static getEntityIds;
    private static getRelationIds;
    private static getEntityMap;
    private static getResults;
    getLoaders(): {
        User: {
            __resolveReference: (items: ILoader<IUserReference, undefined>[], _: MercuriusContext) => Promise<UserEntity[]>;
            profiles: (items: ILoader<UserEntity, FilterRelationDto>[], _: MercuriusContext) => Promise<IPaginated<ProfileEntity>[]>;
            institutions: (items: ILoader<UserEntity, FilterRelationDto>[], _: MercuriusContext) => Promise<IPaginated<InstitutionEntity>[]>;
        };
        InstitutionProfile: {
            __resolveReference: (items: ILoader<IProfileReference, undefined>[], _: MercuriusContext) => Promise<ProfileEntity[]>;
            user: (items: ILoader<ProfileEntity, undefined>[], _: MercuriusContext) => Promise<UserEntity[]>;
            institution: (items: ILoader<ProfileEntity, undefined>[], _: MercuriusContext) => Promise<InstitutionEntity[]>;
        };
        Invitation: {
            __resolveReference: (items: ILoader<IInvitationReference, undefined>[], _: MercuriusContext) => Promise<InvitationEntity[]>;
            institution: (items: ILoader<InvitationEntity, undefined>[], _: MercuriusContext) => Promise<InstitutionEntity[]>;
            sender: (items: ILoader<InvitationEntity, undefined>[], _: MercuriusContext) => Promise<UserEntity[]>;
        };
        ProfileRequest: {
            __resolveReference: (items: ILoader<IProfileRequestReference, undefined>[], _: MercuriusContext) => Promise<ProfileRequestEntity[]>;
            institution: (items: ILoader<ProfileRequestEntity, undefined>[], _: MercuriusContext) => Promise<InstitutionEntity[]>;
            sender: (items: ILoader<ProfileRequestEntity, undefined>[], _: MercuriusContext) => Promise<UserEntity[]>;
            recipient: (items: ILoader<ProfileRequestEntity, undefined>[], _: MercuriusContext) => Promise<UserEntity[]>;
        };
        Institution: {
            __resolveReference: (items: ILoader<IInstitutionReference, undefined>[], _: MercuriusContext) => Promise<InstitutionEntity[]>;
            owner: (items: ILoader<InstitutionEntity, undefined>[], _: MercuriusContext) => Promise<UserEntity[]>;
            profiles: (items: ILoader<InstitutionEntity, FilterRelationDto>[], _: MercuriusContext) => Promise<IPaginated<ProfileEntity>[]>;
            addresses: (items: ILoader<InstitutionEntity, undefined>[], _: MercuriusContext) => Promise<AddressEntity[][]>;
        };
        Address: {
            __resolveReference: (items: ILoader<IAddressReference, undefined>[], _: MercuriusContext) => Promise<AddressEntity[]>;
            institution: (items: ILoader<AddressEntity, undefined>[], _: MercuriusContext) => Promise<InstitutionEntity[]>;
            author: (items: ILoader<AddressEntity, undefined>[], _: MercuriusContext) => Promise<UserEntity[]>;
        };
    };
    private loadUsersReferences;
    private loadUserProfiles;
    private loadUsersInstitutions;
    private loadProfilesReferences;
    private loadProfilesUser;
    private loadProfilesInstitution;
    private loadInstitutionsReferences;
    private loadInstitutionsOwner;
    private loadInstitutionsAddresses;
    private loadInstitutionsProfiles;
    private loadInvitationsReferences;
    private loadInvitationsInstitution;
    private loadInvitationsSender;
    private loadProfileRequestsReferences;
    private loadProfileRequestsInstitution;
    private loadProfileRequestsRecipient;
    private loadProfileRequestsSender;
    private loadAddressesReferences;
    private loadAddressesInstitution;
    private loadAddressesAuthor;
    private loadReferences;
    private basicPaginator;
}
