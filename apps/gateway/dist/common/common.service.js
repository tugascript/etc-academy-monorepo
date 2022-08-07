"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var CommonService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonService = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const fs_1 = require("fs");
const path_1 = require("path");
const slugify_1 = __importDefault(require("slugify"));
const uuid_1 = require("uuid");
const query_order_enum_1 = require("./enums/query-order.enum");
const utils_1 = require("./utils");
const publicKeyPath = (0, path_1.join)(__dirname, '..', '..', '..', 'jwt.key.pub');
const publicKey = (0, fs_1.readFileSync)(publicKeyPath, 'utf8');
let CommonService = CommonService_1 = class CommonService {
    static getOrderBy(cursor, order, innerCursor) {
        return innerCursor
            ? {
                [cursor]: {
                    [innerCursor]: order,
                },
            }
            : {
                [cursor]: order,
            };
    }
    static getFilters(cursor, decoded, order, innerCursor) {
        return innerCursor
            ? {
                [cursor]: {
                    [innerCursor]: {
                        [order]: decoded,
                    },
                },
            }
            : {
                [cursor]: {
                    [order]: decoded,
                },
            };
    }
    static encodeCursor(val) {
        let str;
        if (val instanceof Date) {
            str = val.getTime().toString();
        }
        else if (typeof val === 'number' || typeof val === 'bigint') {
            str = val.toString();
        }
        else {
            str = val;
        }
        return Buffer.from(str, 'utf-8').toString('base64');
    }
    static createEdge(instance, cursor, innerCursor) {
        try {
            return {
                node: instance,
                cursor: CommonService_1.encodeCursor(innerCursor ? instance[cursor][innerCursor] : instance[cursor]),
            };
        }
        catch (_) {
            throw new common_1.InternalServerErrorException('The given cursor is invalid');
        }
    }
    paginate(instances, currentCount, previousCount, cursor, first, innerCursor) {
        const pages = {
            currentCount,
            previousCount,
            edges: [],
            pageInfo: {
                endCursor: '',
                startCursor: '',
                hasPreviousPage: false,
                hasNextPage: false,
            },
        };
        const len = instances.length;
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                pages.edges.push(CommonService_1.createEdge(instances[i], cursor, innerCursor));
            }
            pages.pageInfo.startCursor = pages.edges[0].cursor;
            pages.pageInfo.endCursor = pages.edges[len - 1].cursor;
            pages.pageInfo.hasNextPage = currentCount > first;
            pages.pageInfo.hasPreviousPage = previousCount > 0;
        }
        return pages;
    }
    decodeCursor(cursor, isNum = false) {
        const str = Buffer.from(cursor, 'base64').toString('utf-8');
        if (isNum) {
            const num = parseInt(str, 10);
            if (isNaN(num))
                throw new common_1.BadRequestException('Cursor does not reference a valid number');
            return num;
        }
        return str;
    }
    async queryBuilderPagination(alias, cursor, first, order, qb, after, afterIsNum = false, innerCursor) {
        const strCursor = String(cursor);
        const aliasCursor = `${alias}.${strCursor}`;
        let prevCount = 0;
        if (after) {
            const decoded = this.decodeCursor(after, afterIsNum);
            const oppositeOd = (0, query_order_enum_1.getOppositeOrder)(order);
            const tempQb = qb.clone();
            tempQb.andWhere(CommonService_1.getFilters(cursor, decoded, oppositeOd, innerCursor));
            prevCount = await tempQb.count(aliasCursor, true);
            const normalOd = (0, query_order_enum_1.getQueryOrder)(order);
            qb.andWhere(CommonService_1.getFilters(cursor, decoded, normalOd, innerCursor));
        }
        const cqb = qb.clone();
        const [count, entities] = await this.throwInternalError(Promise.all([
            cqb.count(aliasCursor, true),
            qb
                .select(`${alias}.*`)
                .orderBy(CommonService_1.getOrderBy(cursor, order, innerCursor))
                .limit(first)
                .getResult(),
        ]));
        return this.paginate(entities, count, prevCount, cursor, first, innerCursor);
    }
    generateChange(entity, changeType) {
        return {
            edge: CommonService_1.createEdge(entity, 'id'),
            type: changeType,
        };
    }
    formatTitle(title) {
        return title
            .trim()
            .replace(/\n/g, ' ')
            .replace(/\s\s+/g, ' ')
            .replace(/\w\S*/g, (w) => w.replace(/^\w/, (l) => l.toUpperCase()));
    }
    formatSearch(search) {
        return `%${search
            .trim()
            .replace(/\n/g, ' ')
            .replace(/\s\s+/g, ' ')
            .toLowerCase()}%`;
    }
    generatePointSlug(str) {
        return (0, slugify_1.default)(str, { lower: true, replacement: '.', remove: /['_\.]/g });
    }
    generateSlug(str) {
        return (0, slugify_1.default)(`${str} ${(0, uuid_1.v4)().substring(0, 6)}`, {
            lower: true,
            remove: /['_\.]/g,
        });
    }
    checkExistence(name, entity) {
        if (!entity)
            throw new common_1.NotFoundException(`${name} not found`);
    }
    async validateEntity(entity) {
        const errors = await (0, class_validator_1.validate)(entity);
        if (errors.length > 0)
            throw new common_1.BadRequestException('Entity validation failed');
    }
    async saveEntity(repo, entity, isNew = false) {
        await this.validateEntity(entity);
        if (isNew)
            repo.persist(entity);
        await this.throwDuplicateError(repo.flush());
    }
    async removeEntity(repo, entity) {
        await this.throwInternalError(repo.removeAndFlush(entity));
    }
    async throwDuplicateError(promise, message) {
        try {
            return await promise;
        }
        catch (error) {
            if (error.code === '23505')
                throw new common_1.ConflictException(message !== null && message !== void 0 ? message : 'Duplicated value in database');
            throw new common_1.BadRequestException(error.message);
        }
    }
    async throwInternalError(promise) {
        try {
            return await promise;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    transformVideoURL(url) {
        const regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        const result = url.match(regex)[7];
        if (!result)
            throw new common_1.BadRequestException('Please add a valid youtube video');
        return result;
    }
    async verifyAccessToken(token) {
        try {
            const { id, name, roles } = await (0, utils_1.verifyToken)(token, publicKey);
            return { id, name, roles };
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    getUserRole(user, institutionId) {
        const role = user.roles[institutionId];
        if (!role)
            throw new common_1.UnauthorizedException("You aren't part of this institution");
        return role.role;
    }
};
CommonService = CommonService_1 = __decorate([
    (0, common_1.Injectable)()
], CommonService);
exports.CommonService = CommonService;
//# sourceMappingURL=common.service.js.map