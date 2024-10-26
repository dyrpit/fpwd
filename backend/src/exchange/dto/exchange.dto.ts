import { z } from 'zod';

import { BASE_CURRENCY, EXCHANGE_CURRENCY } from 'src/types/types';

export const ExchangeSchema = z
  .object({
    base: z.nativeEnum(BASE_CURRENCY),
    exchange: z.nativeEnum(EXCHANGE_CURRENCY),
    exchangeValue: z.number(),
  })
  .strict();

export type ExchangeDto = z.infer<typeof ExchangeSchema>;
