import { ObjectId } from "mongodb";

export function validateObjectId(request, response, next) {
  const { id } = request.params;

  if (!ObjectId.isValid(id)) {
    return response.status(400).json({
      success: false,
      data: null,
      message: "The provided project ID is invalid.",
    });
  }

  return next();
}