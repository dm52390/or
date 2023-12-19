export class MissingFieldsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MissingFieldsError";
    }
}

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
}
