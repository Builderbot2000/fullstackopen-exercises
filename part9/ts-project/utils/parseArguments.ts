export const parseBmiArguments = (
  argument: Array<string>
): [number, number] => {
  if (argument.length < 4) throw new Error("Not enough arguments");
  if (argument.length > 4) throw new Error("Too many arguments");
  if (!isNaN(Number(argument[2])) && !isNaN(Number(argument[3]))) {
    return [Number(argument[2]), Number(argument[3])];
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const parseExerciseArguments = (
  argument: Array<string>
): [Array<number>, number] => {
  if (argument.length < 4) throw new Error("Not enough arguments");
  if (
    !isNaN(Number(argument[2])) &&
    argument.slice(3, argument.length).filter((e) => isNaN(Number(e))).length ==
      0
  ) {
    return [
      argument.slice(3, argument.length).map((num: string) => Number(num)),
      Number(argument[2]),
    ];
  } else {
    throw new Error("Provided values were not numbers!");
  }
};
