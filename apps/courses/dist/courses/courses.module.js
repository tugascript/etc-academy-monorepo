"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesModule = void 0;
const nestjs_1 = require("@mikro-orm/nestjs");
const common_1 = require("@nestjs/common");
const profiles_module_1 = require("../profiles/profiles.module");
const courses_resolver_1 = require("./courses.resolver");
const courses_service_1 = require("./courses.service");
const course_entity_1 = require("./entities/course.entity");
let CoursesModule = class CoursesModule {
};
CoursesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_1.MikroOrmModule.forFeature([course_entity_1.CourseEntity]),
            (0, common_1.forwardRef)(() => profiles_module_1.ProfilesModule),
        ],
        providers: [courses_resolver_1.CoursesResolver, courses_service_1.CoursesService],
        exports: [courses_service_1.CoursesService],
    })
], CoursesModule);
exports.CoursesModule = CoursesModule;
//# sourceMappingURL=courses.module.js.map