import { prisma } from "../utils/prisma";
import bcrypt from "bcrypt";

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(email: string, password: string, name: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { email, name, password: hashedPassword },
  });
}

export async function validatePassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}