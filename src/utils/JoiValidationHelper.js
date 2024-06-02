const JoiValidationHelper = (joiSchema, input) => {
  const validatedVals = joiSchema.validate(input);
  if (validatedVals?.error) {
    throw new Error(validatedVals?.error?.details[0]?.message);
  }
  return validatedVals.value;
};

module.exports = JoiValidationHelper;
