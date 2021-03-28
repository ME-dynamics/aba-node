import {
  IEqual,
  INotEqual,
  IGreaterThan,
  ILessThan,
  IIN,
} from "../types";
import { separator } from "./constant";



/**
 ** will generate a equal statement
 ** like id = :id
 ** if equals self, returns argument = :argument
 ** else returns argument = value_given
 * @param args an object containing argument, equal value or self for parameters
 * @returns an equality string for scylla db
 */
export function equal(args: IEqual) {
  const { argument, equals, self } = args;
  if (self) {
    return `${argument.toLowerCase()} = :${argument.toLowerCase()}`;
  } else {
    return `${argument.toLowerCase()} = ${equals}`;
  }
}

/**
 ** produce greater than or equal and greater than a value string
 ** using self will result in argument > :argument for passing parameter
 * @param args an object containing argument, greater_than value or self for parameters
 * @returns a greater than string for scylla db
 */
export function greaterThan(args: IGreaterThan) {
  const { argument, greaterThan, equality, self } = args;
  if (self) {
    return `${argument.toLowerCase()} >${
      equality ? "=" : ""
    } :${argument.toLowerCase()}`;
  } else {
    return `${argument.toLowerCase()} >${equality ? "=" : ""} ${greaterThan}`;
  }
}



/**
 ** produce less than or equal and less than a value string
 ** using self will result in argument < :argument for passing parameter
 * @param args an object containing argument, less_than value or self for parameters
 * @returns a less than string for scylla db
 */
export function lessThan(args: ILessThan) {
  const { argument, lessThan, equality, self } = args;
  if (self) {
    return `${argument.toLowerCase()} <${
      equality ? "=" : ""
    } :${argument.toLowerCase()}`;
  } else {
    return `${argument.toLowerCase()} <${equality ? "=" : ""} ${lessThan}`;
  }
}


/**
 ** produce not equal to a value string
 ** using self will result in argument != :argument for passing parameter
 * @param args an object containing argument, not equal value or self for parameters
 * @returns a not equal string for scylla db
 */
export function notEqual(args: INotEqual) {
  const { argument, notEqual, self } = args;
  if (self) {
    return `${argument.toLowerCase()} != :${argument.toLowerCase()}`;
  } else {
    return `${argument.toLowerCase()} != ${notEqual}`;
  }
}
/**
 ** produce IN operator, use one argument and a group of items like
 ** arg1 IN (1, 2, 3). it can use argument as should pass in array in.
 ** arg1 IN :arg1 =====> {arg1: [1,2,3]}; 
 * @param args an object containing argument, items or self indicator
 * @returns a IN operation string
 */
export function IN(args: IIN) {
  const { argument, items, self } = args;
  if (self) {
    return `${argument} IN :${argument}`;
  } else {
    return `${argument.toLowerCase()} IN (${items?.join(separator)})`;
  }
}



/**
 ** returns a is null check for scylla db
 * @param argument argument, string
 * @returns a string , is null check 
 */
export function isNull(argument: string) {
  return `${argument} = NULL`;
}
/**
 * returns a not null check for scylla db
 * @param argument argument string
 * @returns a string , not null check 
 */
export function notNull(argument: string) {
  return `${argument} != NULL`;
}

/**
 * @returns EXISTS string
 */
export function exists() {
  return "EXISTS"
}

/**
 * @returns NOT EXISTS string
 */
export function notExists() {
  return "NOT EXISTS"
}

// export function contains(args) {

// }
