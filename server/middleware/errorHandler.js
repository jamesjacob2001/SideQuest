export function errorHandler(error, request, response, next) {
  console.error(error);

  const statusCode = error.statusCode || 500;

  response.status(statusCode).json({
    success: false,
    data: null,
    message:
      statusCode === 500
        ? "An unexpected server error occurred."
        : error.message,
  });
}
