import { type Entity } from 'redis-om';
/* our Movie interface for HTTP request transformation */

export interface MovieEntity extends Entity {
    uuid?: string;
    name: string;
    releasedDate: Date;
    genders: string[];
}
