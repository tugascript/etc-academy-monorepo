import { IBase } from './base.interface';
import { IReference } from './reference.interface';
export interface ILoader<T extends IBase | IReference, P = undefined> {
    obj: T;
    params: P;
}
