const { validationResult } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    const validationErrorsArray = validationErrors.array();
    let errors = [];
    for (let i = 0; i < validationErrorsArray.length; i++) {
      let error = validationErrorsArray[i];
      if (error.msg !== "Invalid value") {
        errors.push({ param: error.param, msg: error.msg });
      }
    }

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors,
};
