import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
extendZodWithOpenApi(z);

export const Cohort = z
  .object({
    id: z.number().int().openapi({ example: 1 }),
    name: z.string().openapi({ example: "Full Stack Cohort" })
  })
  .openapi("Cohort");

export const CohortList = z.array(Cohort).openapi("CohortList");
