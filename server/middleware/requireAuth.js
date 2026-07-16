export function requireAuth(request, response, next) {
  if (request.isAuthenticated && request.isAuthenticated()) {
    return next();
  }

  return response.status(401).json({
    success: false,
    data: null,
    message: "Authentication required.",
  });
}
