export declare type tOrderEnum = '$gt' | '$lt';
export declare type tOppositeOrder = '$gte' | '$lte';
export declare enum QueryOrderEnum {
    ASC = "ASC",
    DESC = "DESC"
}
export declare const getQueryOrder: (order: QueryOrderEnum) => tOrderEnum;
export declare const getOppositeOrder: (order: QueryOrderEnum) => tOppositeOrder;
