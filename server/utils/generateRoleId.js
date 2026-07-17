import { randomUUID } from "node:crypto";

export function generateRoleId() {
  return randomUUID();
}
