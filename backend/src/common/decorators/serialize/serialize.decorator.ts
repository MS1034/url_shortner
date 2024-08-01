import { UseInterceptors } from '@nestjs/common';
import {
  SerializeInterceptor,
  ClassConstructor,
} from 'src/common/interceptors/serialize/serialize.interceptor';

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
