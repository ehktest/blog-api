"use strict";

module.exports = (err, req, res, next) => {
  const errorStatusCode = res?.errorStatusCode ?? 500;

  console.error(`Error : ${(err?.cause ?? err?.message ?? err?.stack) || err}`);
  res.status(errorStatusCode).send({
    error: true,
    code: errorStatusCode,
    message: err?.message,
    cause: err?.cause,
    stack: err?.stack,
  });
};
