import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLaunchNotifications() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const moviesToNotify = await prisma.movie.findMany({
        where: {
            launch: {
                gte: today.toISOString(),
                lt: tomorrow.toISOString(),
            },
        },
        include: {
            user: true,
        },
    });

    for (const movie of moviesToNotify) {
        try {
            const userEmail = movie.user.email;

            await resend.emails.send({
                from: "v.augusto.am@gmail.com",
                to: userEmail,
                subject: `🎬 Hoje é o lançamento de "${movie.title}"!`,
                html: `
          <h2>O filme "${movie.title}" estreia hoje!</h2>
          <p>Sinopse: ${movie.synopsis}</p>
          <p>Aproveite e confira o filme! 🍿</p>
        `,
            });
        } catch (err) {
            console.error(`❌ Erro ao enviar email para filme "${movie.title}":`, err);
        }
    }
}