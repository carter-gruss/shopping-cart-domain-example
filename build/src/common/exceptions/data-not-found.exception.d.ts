export declare class DataNotFoundException extends Error {
    private response;
    constructor(response: string);
    initMessage(): void;
}
