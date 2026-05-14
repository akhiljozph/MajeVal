import { z } from "zod";

export const countrySchema = z.object({
    body: z.object({
        code: z.string('Unique code is required (IND for India)'),
        countryCode: z.string('Country code is required'),
        countryName: z.string('Country name is required')
    })
});