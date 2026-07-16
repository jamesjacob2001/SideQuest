export function sanitizeUser(user) {
  if (!user) {
    return null;
  }

  const { passwordHash, ...safeUser } = user;

  return safeUser;
}

export function sanitizeUsers(users) {
  return users.map((user) => sanitizeUser(user));
}
