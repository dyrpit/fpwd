import { z } from 'zod';

import { BASE_CURRENCY, EXCHANGE_CURRENCY } from 'src/types/types';

export const ExchangeRatesSchema = z
  .object({
    base: z.nativeEnum(BASE_CURRENCY),
    exchange: z.nativeEnum(EXCHANGE_CURRENCY),
  })
  .strict();

export type ExchangeRatesDto = z.infer<typeof ExchangeRatesSchema>;
