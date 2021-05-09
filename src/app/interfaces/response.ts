import { ResponseType } from "../enums/response-type.enum";

export interface Response {
    onRespond(responseSource: ResponseType, responseMessage: string): void
}
