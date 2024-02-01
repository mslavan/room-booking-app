import { TransformFnParams } from 'class-transformer';

export const TransformDate = (params: TransformFnParams) => {
  const { value } = params;
  return value.toISOString();
};
