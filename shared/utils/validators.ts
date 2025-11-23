import * as yup from 'yup';
import {ValidationError} from 'yup';
import parsePhoneNumber from 'libphonenumber-js/max';

type YupMethodScheme = yup.StringSchema<string | undefined, yup.AnyObject>;

interface Scheme extends YupMethodScheme {
  phoneValidation(): YupMethodScheme;
}
const customYup = {string: yup.string as () => Scheme};
export {customYup};

yup.addMethod<YupMethodScheme>(yup.string, 'phoneValidation', function () {
  return this.test('phoneValidation', 'Invalid phone', async function (value): Promise<
    boolean | ValidationError
  > {
    if (!value) return true;

    let phoneNumber;
    try {
      phoneNumber = parsePhoneNumber(value, 'IL');
    } catch {
      return this.createError({
        message: 'Invalid phone format',
        path: this.path,
      });
    }

    if (!phoneNumber || !phoneNumber.isValid()) {
      return this.createError({
        message: 'Invalid phone number',
        path: this.path,
      });
    }

    if (phoneNumber.isPossible()) {
      return true;
    } else {
      return this.createError({
        message: 'Impossible phone number',
        path: this.path,
      });
    }
  });
});
