import { cryptoRandom } from "./cryptoRandom";
import { ErrorFactory } from "aba-utils";
import { calculateParameters } from "./calculateParameters";
import type { ISecureRandomNumber } from "../types";



/**
 ** generates random number securely and in an async manner 
 * @param args {min, max} minimum number and maximum number to generate random number in between
 * @returns a random number
 */
export async function secureRandomNumber(
  args: ISecureRandomNumber
): Promise<number> {
  const { min, max } = args;

  if (!min) {
    throw new ErrorFactory({
      name: "minNotDefined",
      message: "you should define min value",
      detail: "",
      path: `random digits, secure random module`,
      nativeError: undefined,
    });
  }

  if (!max) {
    throw new ErrorFactory({
      name: "maxNotDefined",
      message: "you should define max value",
      detail: "",
      path: `random digits, secure random module`,
      nativeError: undefined,
    });
  }

  if (min % 1 !== 0) {
    throw new ErrorFactory({
      name: "minNotInteger",
      message: "you should define min as an integer",
      detail: "",
      path: `random digits, secure random module`,
      nativeError: undefined,
    });
  }

  if (max % 1 !== 0) {
    throw new ErrorFactory({
      name: "maxNotInteger",
      message: "you should define max as an integer",
      detail: "",
      path: `random digits, secure random module`,
      nativeError: undefined,
    });
  }

  if (!(max > min)) {
    throw new ErrorFactory({
      name: "maxLowerThanMin",
      message: "max must be greater than min",
      detail: "",
      path: `random digits, secure random module`,
      nativeError: undefined,
    });
  }

  /* We hardcode the values for the following:
   *
   *   https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER
   *   https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
   *
   * ... as Babel does not appear to transpile them, despite being ES6.
   */

  if (min < -9007199254740991 || min > 9007199254740991) {
    throw new ErrorFactory({
      name: "minSafeInteger",
      message: "must be safe integer ",
      detail: "",
      path: `random digits, secure random module`,
      nativeError: undefined,
    });
  }

  if (max < -9007199254740991 || max > 9007199254740991) {
    throw new ErrorFactory({
      name: "maxSafeInteger",
      message: "must be safe integer ",
      detail: "",
      path: `random digits, secure random module`,
      nativeError: undefined,
    });
  }

  const range: number = max - min;

  if (range < -9007199254740991 || range > 9007199254740991) {
    throw new ErrorFactory({
      name: "rangeSafeInteger",
      message: "must be safe integer ",
      detail: "",
      path: `random digits, secure random module`,
      nativeError: undefined,
    });
  }

  const { bytesNeeded, mask } = calculateParameters(range);
  let randomValue = 0;
  const randomBytes = await cryptoRandom(bytesNeeded);
  for (let i = 0; i < bytesNeeded; i++) {
    randomValue |= randomBytes[i] << (8 * i);
  }
  randomValue = randomValue & mask;
  if (randomValue <= range) {
    /* We've been working with 0 as a starting point, so we need to
     * add the `minimum` here. */
    return min + randomValue;
  } else {
    /* Outside of the acceptable range, throw it away and try again.
     * We don't try any modulo tricks, as this would introduce bias. */
    return await secureRandomNumber({ min, max });
  }
}
