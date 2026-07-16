export function requireSelf(request, response, next) {
  const authenticatedUserId = request.user?._id?.toString();
  const requestedUserId = request.params.id;

  if (authenticatedUserId && authenticatedUserId === requestedUserId) {
    return next();
  }

  return response.status(403).json({
    success: false,
    data: null,
    message: "You can only modify your own account.",
  });
}
