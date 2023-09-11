import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { weatherApi } from "~/server/weatherapi";

export const weatherRouter = createTRPCRouter({
  getWeather: publicProcedure
    .input(z.object({ q: z.string() }))
    .query(({ input }) => {
      // TODO add check if city and latest forecast response is in db
      const data = weatherApi.getWeather(input.q);
      return data;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
