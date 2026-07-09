import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined.");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// AI Co-pilot endpoint
app.post("/api/copilot", async (req, res) => {
  try {
    const { messages, context } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request. 'messages' must be an array." });
    }

    const ai = getGeminiClient();

    // Construct the context instructions
    const systemInstruction = `You are a Senior Data Scientist and Lead Machine Learning Engineer.
You are assisting a student with their final Internship Project titled "Customer Segmentation using K-Means Clustering".
You should answer their questions, provide statistical explanations, explain K-Means, silhouette scores, or business strategies based on the following customer segments found in the Mall Customers Dataset:

1. Premium Customers (Cluster 0): High income, High spending score. Target with exclusive previews, personalized high-end rewards, concierge services.
2. High Income - Low Spending (Cluster 1): High income, Low spending score. Target with luxury value deals, premium membership perks, targeted high-end product matches.
3. Budget Customers (Cluster 2): Low income, High spending score. Target with discount bundles, flash sales, installment options, low-cost loyalty rewards.
4. Regular Customers (Cluster 3): Average income, Average spending score. Target with bulk-buy incentives, standard cash-backs, routine newsletters.
5. Potential Customers (Cluster 4): Low income, Low spending score. Target with welcome coupons, introductory offers, basic engagement surveys.

Dataset Features:
- Age: 18 - 70
- Gender: Male, Female
- Annual Income: 15k$ - 137k$
- Spending Score: 1 - 100

Always respond with high professional authority, clear mathematical/data explanations when relevant, and actionable business strategies. Keep responses highly formatted in markdown.`;

    // Map messages format to Gemini format
    // Gemini 3.5 content expects a structure with parts
    const contents = messages.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // Generate response using gemini-3.5-flash
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I was unable to process that. Please try again.";
    res.json({ content: reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // If the error is due to missing GEMINI_API_KEY, guide the user
    if (error.message && error.message.includes("GEMINI_API_KEY")) {
      return res.status(503).json({
        error: "Gemini API is unavailable.",
        details: "Please configure your GEMINI_API_KEY in the Secrets panel in AI Studio UI.",
      });
    }
    res.status(500).json({ error: "An error occurred with the AI Co-pilot.", details: error.message });
  }
});

// Serve application
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
