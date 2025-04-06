import * as z from "zod"
import { Completeuser, relateduserSchema } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  text: z.string(),
  content: jsonSchema,
  name: z.string(),
  user_id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompletePost extends z.infer<typeof postSchema> {
  user: Completeuser
}

/**
 * relatedPostSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPostSchema: z.ZodSchema<CompletePost> = z.lazy(() => postSchema.extend({
  user: relateduserSchema,
}))
