import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ParseArrayPipe, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class OptionalParseArrayPipe implements PipeTransform {
  constructor(private readonly pipe: ParseArrayPipe) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (value === undefined || value === null || value === '') {
      return [];
    }

    try {
      return this.pipe.transform(value, metadata);
    } catch (error) {
      throw new BadRequestException(
        'Validation failed (parsable array expected)',
      );
    }
  }
}
