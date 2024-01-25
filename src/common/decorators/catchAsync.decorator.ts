import { HttpException } from '@nestjs/common';

export const catchAsync =
  () => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        throw new HttpException(error, 404);
      }
    };

    return descriptor;
  };
