import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { ZodValidationError } from 'src/types/types';
import { ZodError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      const validationErrors: ZodValidationError[] = [];

      if (error instanceof ZodError) {
        error.errors.forEach((err) => {
          validationErrors.push({
            path: err.path,
            cause: err.message,
          });
        });
      }

      throw new BadRequestException({
        message: 'Bad Request',
        error: validationErrors,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
