"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilesService = void 0;
const nestjs_1 = require("@mikro-orm/nestjs");
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
const common_2 = require("../common");
const gql_1 = require("../common/entities/gql");
const enums_1 = require("../common/enums");
const utils_1 = require("../common/utils");
const uploader_1 = require("../uploader");
const email_service_1 = require("../email/email.service");
const users_service_1 = require("../users/users.service");
const invitation_entity_1 = require("./entities/invitation.entity");
const profile_request_entity_1 = require("./entities/profile-request.entity");
const profile_entity_1 = require("./entities/profile.entity");
let ProfilesService = class ProfilesService {
    constructor(profilesRepository, invitationsRepository, profileRequestsRepository, commonService, configService, uploaderService, usersService, emailService) {
        this.profilesRepository = profilesRepository;
        this.invitationsRepository = invitationsRepository;
        this.profileRequestsRepository = profileRequestsRepository;
        this.commonService = commonService;
        this.configService = configService;
        this.uploaderService = uploaderService;
        this.usersService = usersService;
        this.emailService = emailService;
        this.frontendUrl = this.configService.get('FRONTEND_URL');
        this.invitationPassword = this.configService.get('INVITATION_JWT_PASSWORD');
    }
    async createInitialProfile(userId, institutionId) {
        const user = await this.usersService.userById(userId);
        const profile = this.profilesRepository.create({
            institution: institutionId,
            user: userId,
            slug: this.commonService.generateSlug(user.name),
            picture: user.picture,
            role: enums_1.ProfileRoleEnum.ADMIN,
            status: enums_1.ProfileStatusEnum.STAFF,
        });
        await this.commonService.saveEntity(this.profilesRepository, profile, true);
        return profile;
    }
    async updateProfilePicture(userId, { picture, profileId, institutionId }) {
        const profile = await this.profileByRelations(userId, institutionId);
        if (profile.role !== enums_1.ProfileRoleEnum.ADMIN)
            throw new common_1.UnauthorizedException('You are not authorized to update profile pictures');
        const updatedProfile = await this.profileById(institutionId, profileId);
        const oldPicture = updatedProfile.picture;
        updatedProfile.picture = await this.uploaderService.uploadImage(userId, picture, enums_1.RatioEnum.SQUARE);
        await this.commonService.saveEntity(this.profilesRepository, updatedProfile);
        if (oldPicture)
            await this.uploaderService.deleteFile(oldPicture);
        return updatedProfile;
    }
    async updateProfileStatus(userId, { status, profileId, institutionId }) {
        const profile = await this.profileByRelations(userId, institutionId);
        if (profile.role !== enums_1.ProfileRoleEnum.ADMIN)
            throw new common_1.UnauthorizedException('You are not authorized to update profile status');
        const updatedProfile = await this.profileById(institutionId, profileId);
        if (updatedProfile.status === status)
            throw new common_1.BadRequestException(`Profile status is already set to ${status.toLowerCase()}`);
        updatedProfile.status = status;
        await this.commonService.saveEntity(this.profilesRepository, updatedProfile);
        return updatedProfile;
    }
    async updateProfileRole(userId, { role, profileId, institutionId }) {
        const profile = await this.profileByRelations(userId, institutionId);
        if (profile.role !== enums_1.ProfileRoleEnum.ADMIN)
            throw new common_1.UnauthorizedException('You are not authorized to update profile roles');
        const updatedProfile = await this.profileById(institutionId, profileId);
        if (updatedProfile.role === role)
            throw new common_1.BadRequestException(`Profile role is already set to ${role.toLowerCase()}`);
        updatedProfile.role = role;
        await this.commonService.saveEntity(this.profilesRepository, updatedProfile);
        return updatedProfile;
    }
    async sendProfileRequest(userId, { institutionId, userEmail, role, userName, status }) {
        const profile = await this.profileByRelations(userId, institutionId, true);
        if (status === enums_1.ProfileStatusEnum.STAFF &&
            profile.role !== enums_1.ProfileRoleEnum.ADMIN) {
            throw new common_1.UnauthorizedException('You are not authorized to create staff profiles');
        }
        const user = await this.usersService.uncheckedUserByEmail(userEmail);
        if (!user) {
            this.checkStatusAndRole(role, status);
            const invitation = this.invitationsRepository.findOne({
                email: userEmail,
            });
            if (!invitation) {
                const newInvitation = this.invitationsRepository.create({
                    email: userEmail,
                    profileRole: role,
                    profileStatus: status,
                    institution: institutionId,
                    sender: userId,
                });
                await this.commonService.saveEntity(this.invitationsRepository, newInvitation, true);
                this.emailService.sendInvitation(userName, userEmail, role, profile.institution.name, profile.user.name, await this.generateInvitationLink(newInvitation.id));
                return new gql_1.LocalMessageType('Invitation sent successfully');
            }
            return new gql_1.LocalMessageType('Invitation already sent');
        }
        const request = this.profileRequestsRepository.create({
            profileStatus: status,
            profileRole: role,
            institution: institutionId,
            recipient: user.id,
            sender: userId,
        });
        await this.commonService.saveEntity(this.profileRequestsRepository, request, true);
        this.emailService.sendRequest(user, role, profile);
        return new gql_1.LocalMessageType('Request sent successfully');
    }
    async respondToInvitation(userId, { token, response }) {
        const invitationId = await this.verifyInvitationToken(token);
        const invitation = await this.invitationById(invitationId);
        const user = await this.usersService.userById(userId);
        if (invitation.email !== user.email)
            throw new common_1.UnauthorizedException('This invitation is not for your email');
        if (invitation.status !== enums_1.RequestStatusEnum.PENDING)
            throw new common_1.BadRequestException('You have already responded to this invitation');
        invitation.status = response;
        if (response === enums_1.RequestStatusEnum.REJECTED) {
            await this.commonService.saveEntity(this.invitationsRepository, invitation);
            return new gql_1.LocalMessageType('Invitation rejected successfully');
        }
        await this.acceptInvitation(invitation, user);
        return new gql_1.LocalMessageType('Invitation accepted successfully');
    }
    async acceptRejectedInvitation(userId, invitationId) {
        const invitation = await this.invitationById(invitationId);
        const user = await this.usersService.userById(userId);
        if (invitation.email !== user.email)
            throw new common_1.UnauthorizedException('This invitation is not for your email');
        if (invitation.status === enums_1.RequestStatusEnum.ACCEPTED)
            throw new common_1.BadRequestException('Invitation already accepted');
        invitation.status = enums_1.RequestStatusEnum.ACCEPTED;
        await this.acceptInvitation(invitation, user);
        return new gql_1.LocalMessageType('Invitation accepted successfully');
    }
    async respondToProfileRequest(userId, { response, requestId }) {
        const request = await this.requestById(userId, requestId, true);
        if (request.recipient.id !== userId)
            throw new common_1.BadRequestException("You sent this request, you didn't receive it");
        if (request.status !== enums_1.RequestStatusEnum.PENDING)
            throw new common_1.BadRequestException('You have already responded to this request');
        request.status = response;
        if (response === enums_1.RequestStatusEnum.REJECTED) {
            await this.commonService.saveEntity(this.profileRequestsRepository, request);
            return new gql_1.LocalMessageType('Request rejected successfully');
        }
        await this.acceptRequest(request);
        return new gql_1.LocalMessageType('Request accepted successfully');
    }
    async acceptRejectedProfileRequest(userId, requestId) {
        const request = await this.requestById(userId, requestId, true);
        if (request.recipient.id !== userId)
            throw new common_1.BadRequestException("You sent this request, you didn't receive it");
        if (request.status === enums_1.RequestStatusEnum.ACCEPTED)
            throw new common_1.BadRequestException('Request already accepted');
        request.status = enums_1.RequestStatusEnum.ACCEPTED;
        await this.acceptRequest(request);
        return new gql_1.LocalMessageType('Request accepted successfully');
    }
    async invitationByToken(token) {
        const id = await this.verifyInvitationToken(token);
        const invitation = await this.invitationById(id);
        return invitation;
    }
    async filterProfileRequests(userId, { status, userType, first, after }) {
        const qb = this.profileRequestsRepository.createQueryBuilder('pr').where(userType === enums_1.RequestUserEnum.RECIPIENT
            ? {
                recipient: userId,
            }
            : { sender: userId });
        if (status)
            qb.andWhere({ status });
        return this.commonService.queryBuilderPagination('pr', 'id', first, enums_1.QueryOrderEnum.DESC, qb, after, true);
    }
    async profileById(institutionId, profileId) {
        const profile = await this.profilesRepository.findOne({
            id: profileId,
            institution: institutionId,
        });
        this.commonService.checkExistence('Profile', profile);
        return profile;
    }
    async profileBySlug(institutionId, slug) {
        const profile = await this.profilesRepository.findOne({
            institution: institutionId,
            slug,
        });
        this.commonService.checkExistence('Profile', profile);
        return profile;
    }
    async profileByRelations(userId, institutionId, populate = false) {
        const profile = this.profilesRepository.findOne({
            user: userId,
            institution: institutionId,
        }, populate
            ? {
                populate: ['institution', 'user'],
            }
            : undefined);
        this.commonService.checkExistence('Profile', profile);
        return profile;
    }
    async checkProfileExistence(userId, institutionId) {
        const count = await this.profilesRepository.count({
            user: userId,
            institution: institutionId,
        });
        if (count === 0)
            throw new common_1.UnauthorizedException('Only members of an institution can see its profiles');
    }
    async filterProfiles(userId, { institutionId, search, order, cursor, first, after }) {
        await this.checkProfileExistence(userId, institutionId);
        const qb = this.profilesRepository.createQueryBuilder('p').where({
            institution: institutionId,
        });
        if (search) {
            qb.leftJoin('p.user', 'u').andWhere({
                user: {
                    name: {
                        $iLike: this.commonService.formatSearch(search),
                    },
                },
            });
        }
        return this.commonService.queryBuilderPagination('p', (0, enums_1.getQueryCursor)(cursor), first, order, qb, after, cursor === enums_1.QueryCursorEnum.DATE);
    }
    async userProfiles(userId) {
        return this.profilesRepository.find({
            user: userId,
        }, {
            populate: ['user'],
        });
    }
    async userProfileById(profileId) {
        const profile = await this.profilesRepository.findOne({
            id: profileId,
        }, {
            populate: ['user'],
        });
        if (!profile)
            throw new microservices_1.RpcException('Profile not found');
        return profile;
    }
    async requestById(userId, requestId, populate = false) {
        const request = await this.profileRequestsRepository.findOne({
            id: requestId,
        }, populate ? { populate: ['recipient'] } : undefined);
        this.commonService.checkExistence('Request', request);
        if (request.sender.id !== userId || request.recipient.id !== userId)
            throw new common_1.NotFoundException('Request not found');
        return request;
    }
    async invitationsByUser(userId, status) {
        const user = await this.usersService.userById(userId);
        return await this.invitationsRepository.find({
            status,
            email: user.email,
        });
    }
    async invitationById(invitationId) {
        const invitation = await this.invitationsRepository.findOne({
            id: invitationId,
        });
        this.commonService.checkExistence('Invitation', invitation);
        return invitation;
    }
    async acceptInvitation(invitation, user) {
        const { profileStatus, profileRole, institution } = invitation;
        const profile = this.profilesRepository.create({
            institution,
            status: profileStatus,
            role: profileRole,
            user: user,
            picture: user.picture,
            slug: this.commonService.generateSlug(user.name),
        });
        await this.commonService.saveEntity(this.profilesRepository, profile, true);
    }
    async acceptRequest(request) {
        const { profileStatus, profileRole, institution } = request;
        const profile = this.profilesRepository.create({
            institution,
            status: profileStatus,
            role: profileRole,
            user: request.recipient,
            picture: request.recipient.picture,
            slug: this.commonService.generateSlug(request.recipient.name),
        });
        await this.commonService.saveEntity(this.profilesRepository, profile, true);
    }
    checkStatusAndRole(role, status) {
        switch (role) {
            case enums_1.ProfileRoleEnum.ADMIN:
            case enums_1.ProfileRoleEnum.STAFF:
            case enums_1.ProfileRoleEnum.TEACHER:
                if (status !== enums_1.ProfileStatusEnum.STAFF)
                    throw new common_1.BadRequestException('Invalid status');
                break;
            case enums_1.ProfileRoleEnum.STUDENT:
                if (status === enums_1.ProfileStatusEnum.STAFF)
                    throw new common_1.BadRequestException('Invalid status');
                break;
        }
    }
    async generateInvitationLink(invitationId) {
        const token = await (0, utils_1.generateToken)({ id: invitationId }, this.invitationPassword, 0, 'HS256');
        return `${this.frontendUrl}/invitation/${token}`;
    }
    async verifyInvitationToken(token) {
        const { id } = await (0, utils_1.verifyToken)(token, this.invitationPassword, [
            'HS256',
        ]);
        return id;
    }
};
ProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectRepository)(profile_entity_1.ProfileEntity)),
    __param(1, (0, nestjs_1.InjectRepository)(invitation_entity_1.InvitationEntity)),
    __param(2, (0, nestjs_1.InjectRepository)(profile_request_entity_1.ProfileRequestEntity)),
    __metadata("design:paramtypes", [postgresql_1.EntityRepository,
        postgresql_1.EntityRepository,
        postgresql_1.EntityRepository,
        common_2.CommonService,
        config_1.ConfigService,
        uploader_1.UploaderService,
        users_service_1.UsersService,
        email_service_1.EmailService])
], ProfilesService);
exports.ProfilesService = ProfilesService;
//# sourceMappingURL=profiles.service.js.map