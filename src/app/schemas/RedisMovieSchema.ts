import { Entity, Schema } from 'redis-om'

/* our Movie entity */
export class RedisMovie extends Entity {
  /*
   * ! is the non-null assertion operator.
   * It's used to tell TypeScript that you're certain that a property will not be null or undefined at runtime.
   * This class is used for inserting into REDIS Database and then to act as a retrieved element.
   * We are sure that during runtime when REDIS returns element from await repository.createAndSave(data); it will set name correctly
   */
  name!: string
  releasedDate!: Date
  genders!: string[]
}

/* create a Schema for Movie */
const movieSchema = new Schema<RedisMovie>(RedisMovie, {
  name: { type: 'string' },
  releasedDate: { type: 'date' },
  genders: { type: 'string[]' }
})

export default movieSchema
