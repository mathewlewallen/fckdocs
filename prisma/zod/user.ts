import * as z from "zod"
import { CompletePost, relatedPostSchema, CompleteAccount, relatedAccountSchema, CompleteSession, relatedSessionSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  stripeCustomerId: z.string().nullish(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  profileImageUrl: z.string().nullish(),
  isPremium: z.boolean(),
  PremiumUntil: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface Completeuser extends z.infer<typeof userSchema> {
  posts: CompletePost[]
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
}

/**
 * relateduserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relateduserSchema: z.ZodSchema<Completeuser> = z.lazy(() => userSchema.extend({
  posts: relatedPostSchema.array(),
  accounts: relatedAccountSchema.array(),
  sessions: relatedSessionSchema.array(),
}))
