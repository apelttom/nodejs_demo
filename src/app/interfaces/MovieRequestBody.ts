/* our Movie interface for HTTP request transformation */
export interface MovieRequestBody {
    /* This has to be here because REDIS OM method repository.createAndSave(data); accepts only type EntityData. That is why this line allows additional fields */
    [key: string]: string | string[] | Date;
    name: string;
    releasedDate: Date;
    genders: string[];
}
