export function HttpError(status, message) {
    this.status = status;
    this.message = message;
}