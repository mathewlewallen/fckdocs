import * as z from "zod"
import { Completeuser, relateduserSchema } from "./index"

export const accountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullish(),
  access_token: z.string().nullish(),
  expires_at: z.number().int().nullish(),
  token_type: z.string().nullish(),
  scope: z.string().nullish(),
  id_token: z.string().nullish(),
  session_state: z.string().nullish(),
  refresh_token_expires_in: z.number().int().nullish(),
})

export interface CompleteAccount extends z.infer<typeof accountSchema> {
  user: Completeuser
}

/**
 * relatedAccountSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedAccountSchema: z.ZodSchema<CompleteAccount> = z.lazy(() => accountSchema.extend({
  user: relateduserSchema,
}))
