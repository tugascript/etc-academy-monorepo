import { IBase } from '../interfaces';
export declare abstract class LocalBaseEntity implements IBase {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
