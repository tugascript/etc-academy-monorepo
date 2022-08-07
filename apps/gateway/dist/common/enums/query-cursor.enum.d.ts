export declare enum QueryCursorEnum {
    DATE = "DATE",
    ALPHA = "ALPHA"
}
export declare const getQueryCursor: (cursor: QueryCursorEnum) => string;
export declare const getUserQueryCursor: (cursor: QueryCursorEnum) => string;
