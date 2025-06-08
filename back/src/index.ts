import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import movieRoutes from "./routes/movie.routes";
import uploadRouter from "./routes/upload";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("API rodando com sucesso!");
});

app.use("/api", uploadRouter);

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT ?? 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});