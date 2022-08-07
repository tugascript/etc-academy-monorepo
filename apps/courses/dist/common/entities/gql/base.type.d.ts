import { IBase } from '../../interfaces';
export declare abstract class LocalBaseType implements IBase {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
