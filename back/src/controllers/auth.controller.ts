import { Request, Response } from "express";
import { findUserByEmail, createUser, validatePassword } from "../services/user.service";
import { generateToken } from "../utils/jwt";

export async function register(req: Request, res: Response) {
  const { email, password, name } = req.body;

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    const user = await createUser(email, password, name);
    const token = generateToken({ id: user.id, email: user.email });

    return res.status(201).json({ user, token });
  } catch (err) {
    console.error("Erro ao registrar usuário:", err);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const isValid = await validatePassword(password, user.password);

    if (!isValid) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const token = generateToken({ id: user.id, email: user.email });

    return res.json({ user, token });
  } catch (err) {
    console.error("Erro no login:", err);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
}