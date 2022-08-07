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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const nestjs_1 = require("@mikro-orm/nestjs");
const postgresql_1 = require("@mikro-orm/postgresql");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const bcrypt_1 = require("bcrypt");
const dayjs_1 = __importDefault(require("dayjs"));
const uuid_1 = require("uuid");
const common_2 = require("../common");
const gql_1 = require("../common/entities/gql");
const enums_1 = require("../common/enums");
const uploader_1 = require("../uploader");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(usersRepository, commonService, uploaderService) {
        this.usersRepository = usersRepository;
        this.commonService = commonService;
        this.uploaderService = uploaderService;
    }
    async createUser({ name, email, password1, password2, }) {
        if (password1 !== password2)
            throw new common_1.BadRequestException('Passwords do not match');
        name = this.commonService.formatTitle(name);
        const password = await (0, bcrypt_1.hash)(password1, 10);
        let username = this.commonService.generatePointSlug(name);
        if (username.length >= 3) {
            const count = await this.usersRepository.count({
                username: { $like: `${username}%` },
            });
            if (count > 0)
                username += count.toString();
        }
        else {
            username = (0, uuid_1.v4)();
        }
        const user = this.usersRepository.create({
            name,
            username,
            email,
            password,
        });
        await this.saveUserToDb(user, true);
        return user;
    }
    async confirmUser({ userId, count, }) {
        const user = await this.userByIdForAuth(userId);
        if (user.credentials.version !== count)
            throw new microservices_1.RpcException('Invalid credential version');
        if (user.confirmed)
            throw new microservices_1.RpcException('User already confirmed');
        user.confirmed = true;
        user.lastLogin = new Date();
        user.credentials.updateVersion();
        await this.commonService.saveEntity(this.usersRepository, user);
        return user;
    }
    async loginUser({ email, password }) {
        const user = await this.usersRepository.findOne({ email });
        if (!user)
            throw new microservices_1.RpcException('Invalid Credentials');
        const currentPassword = user.password;
        const lastPassword = user.credentials.lastPassword;
        const now = (0, dayjs_1.default)();
        const time = dayjs_1.default.unix(user.credentials.updatedAt);
        const months = now.diff(time, 'month');
        if (!(await (0, bcrypt_1.compare)(password, currentPassword))) {
            if (lastPassword.length > 0 && !(await (0, bcrypt_1.compare)(password, lastPassword))) {
                let message = 'You changed your password ';
                if (months > 0) {
                    message += months + ' months ago.';
                }
                else {
                    const days = now.diff(time, 'day');
                    if (days > 0) {
                        message += days + ' days ago.';
                    }
                    else {
                        const hours = now.diff(time, 'hour');
                        if (hours > 0) {
                            message += hours + ' hours ago.';
                        }
                        else {
                            message += 'recently.';
                        }
                    }
                }
                throw new microservices_1.RpcException(message);
            }
            throw new microservices_1.RpcException('Invalid credentials');
        }
        if (!user.twoFactor) {
            user.lastLogin = new Date();
            await this.saveUserToDb(user);
        }
        return user;
    }
    async changePassword({ userId, count, password1, password2, }) {
        const user = await this.uncheckUserById(userId);
        if (!user || user.credentials.version !== count)
            throw new microservices_1.RpcException('Invalid user access');
        if (password1 !== password2)
            throw new microservices_1.RpcException('Passwords do not match');
        await this.changeUserPassword(user, password1);
        return user;
    }
    async updatePassword({ userId, password, password1, password2, }) {
        if (password1 !== password2)
            throw new microservices_1.RpcException('Passwords do not match');
        const user = await this.userByIdForAuth(userId);
        if (!(await (0, bcrypt_1.compare)(password, user.password)))
            throw new microservices_1.RpcException('Invalid password');
        await this.changeUserPassword(user, password1);
        return user;
    }
    async updateProfilePicture(userId, { picture }) {
        const user = await this.userById(userId);
        const toDelete = user.picture;
        user.picture = await this.uploaderService.uploadImage(userId, picture, enums_1.RatioEnum.SQUARE);
        if (toDelete)
            await this.uploaderService.deleteFile(toDelete);
        await this.commonService.saveEntity(this.usersRepository, user);
        return user;
    }
    async deleteUser(userId, password) {
        const user = await this.userById(userId);
        if (password.length > 1 && !(await (0, bcrypt_1.compare)(password, user.password)))
            throw new common_1.BadRequestException('Wrong password!');
        await this.commonService.removeEntity(this.usersRepository, user);
        return new gql_1.LocalMessageType('Account deleted successfully');
    }
    async updateEmail(userId, email) {
        const user = await this.userById(userId);
        user.email = email;
        await this.commonService.saveEntity(this.usersRepository, user);
        return user;
    }
    async toggleTwoFactor(userId) {
        const user = await this.userById(userId);
        user.twoFactor = !user.twoFactor;
        await this.commonService.saveEntity(this.usersRepository, user);
        return user;
    }
    async uncheckUserById(id) {
        return this.usersRepository.findOne({ id });
    }
    async uncheckedUserByEmail(email) {
        return this.usersRepository.findOne({ email });
    }
    async userByIdForAuth(id) {
        const user = await this.usersRepository.findOne({ id });
        if (!user)
            throw new microservices_1.RpcException('Invalid credentials');
        return user;
    }
    async userByEmailForAuth(email) {
        const user = await this.usersRepository.findOne({ email });
        if (!user)
            throw new microservices_1.RpcException('Invalid credentials');
        return user;
    }
    async userByPayload(userId, count) {
        const user = await this.userByIdForAuth(userId);
        if (user.credentials.version !== count)
            throw new microservices_1.RpcException('Invalid credentials');
        return user;
    }
    async userById(id) {
        const user = await this.usersRepository.findOne({ id });
        this.commonService.checkExistence('User', user);
        return user;
    }
    async userByUsername(username) {
        const user = await this.usersRepository.findOne({ username });
        this.commonService.checkExistence('User', user);
        return user;
    }
    async filterUsers({ search, order, cursor, first, after, }) {
        const name = 'u';
        const qb = this.usersRepository.createQueryBuilder(name).where({
            confirmed: true,
        });
        if (search) {
            qb.andWhere({
                name: {
                    $ilike: this.commonService.formatSearch(search),
                },
            });
        }
        return await this.commonService.queryBuilderPagination(name, (0, enums_1.getUserQueryCursor)(cursor), first, order, qb, after);
    }
    async saveUserToDb(user, isNew = false) {
        var _a;
        if (isNew)
            this.usersRepository.persist(user);
        try {
            await this.usersRepository.flush();
        }
        catch (e) {
            if (e.code === '23505')
                throw new microservices_1.RpcException('Email already exists');
            throw new microservices_1.RpcException((_a = e.message) !== null && _a !== void 0 ? _a : 'Something went wrong');
        }
    }
    async changeUserPassword(user, password) {
        const oldPassword = user.password;
        user.password = await (0, bcrypt_1.hash)(password, 10);
        user.credentials.updatePassword(oldPassword);
        await this.saveUserToDb(user);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [postgresql_1.EntityRepository,
        common_2.CommonService,
        uploader_1.UploaderService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map