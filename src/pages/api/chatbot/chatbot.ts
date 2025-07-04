// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Ambil API key dari environment
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables");
}

// Inisialisasi Gemini client
const genAI = new GoogleGenerativeAI(apiKey);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages, stats } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const {
      totalPopulation = 0,
      menCount = 0,
      womenCount = 0,
      averageAge = 0,
      populationDensity = 0,
      growthRate = 0,
    } = stats || {};

    // Tambahkan prompt sistem di awal
    const systemPrompt = {
      role: "user",
      parts: [
        {
          text:
            "Kamu adalah asisten desa Margasana dan bernama MARGAI. " +
            "Tugasmu adalah membantu masyarakat dalam hal-hal yang berkaitan dengan demografi penduduk di desa Margasana. " +
            "Jika ada pertanyaan di luar topik demografi atau desa Margasana, tolak secara sopan.\n\n" +
            "📊 Data Demografi Terbaru:\n" +
            `• Jumlah Penduduk: ${totalPopulation}\n` +
            `• Laki-laki: ${menCount}\n` +
            `• Perempuan: ${womenCount}\n` +
            `• Rata-rata Usia: ${averageAge} tahun\n` +
            `• Kepadatan Penduduk: ${populationDensity} org/km²\n` +
            `• Laju Pertumbuhan: ${growthRate}%\n`,
        },
      ],
    };

    // Gabungkan system prompt dan history dari user
    const history = [
      systemPrompt,
      ...messages.map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
    ];

    const result = await model.generateContent({
      contents: history,
    });

    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ message: text });
  } catch (error: any) {
    if (error.status === 429) {
      return res.status(429).json({
        error:
          "Kamu telah melewati batas permintaan untuk saat ini. Silakan coba lagi nanti.",
      });
    }
    console.error("Gemini API error:", error);
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
}
