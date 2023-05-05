import { Schema, model } from 'mongoose'

/**
 * Example mongo database schema's definition
 * For example data object we will be putting into DB = an idea
 * (like for notebooks to write down your ideas/dreams and later check them if fullfilled)
 */
const MongoMovie = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    releasedDate: {
      type: Date
    },
    genders: {
      type: [String]
    }
  },
  { timestamps: true }
)

export default model('Movie', MongoMovie)
