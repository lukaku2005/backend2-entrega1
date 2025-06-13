import crypto from "crypto";

export function createHash(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export function validateHash(password, hashedPassword) {
  const passwordHash = createHash(password);
  return passwordHash === hashedPassword;
}
