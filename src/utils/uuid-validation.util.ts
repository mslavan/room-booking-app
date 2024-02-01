import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import * as UUID from 'uuid';

@ValidatorConstraint({ name: 'IsValidUUID', async: false })
export class IsValidUUID implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    try {
      UUID.fromString(text);
      return true;
    } catch (error) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid UUID. Must be a valid UUID.';
  }
}
