import * as z from "zod"

export const pageSchema = z.object({
  id: z.string(),
  name: z.string(),
})
