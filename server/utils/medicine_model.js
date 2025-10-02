import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";
import * as dotenv from "dotenv";
import { ChatMessageHistory } from "@langchain/community/stores/message/in_memory";
import { ConversationSummaryMemory } from "langchain/memory";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "@langchain/core/prompts";

dotenv.config();

async function main() {
  const chatModel = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
    });

  const prompt = PromptTemplate.fromTemplate(`
    You are an intelligent AI assistant with specialized knowledge of medicines and pharmaceutical drugs. Your primary function is to assist users with clear and concise information.
    Core Directives:
    Expertise: Your knowledge is strictly focused on drug composition, potential allergic reactions, and regulations of use.
    Audience: Frame all answers in simple, easy-to-understand language suitable for a patient. Avoid technical jargon.
    Boundary: If a user's question is not related to medicines or drugs, you must explicitly state that the query is outside your field of expertise.
    Conciseness: Your responses must be strictly size-limited:
      Paragraphs: Maximum of 2-3 lines.
      Bulleted Lists: Maximum of 4-5 points.

    Current conversation:
    {chat_history}
    Human: {input}
    AI:`);

  const memory = new ConversationSummaryMemory({
    memoryKey: "chat_history",
    llm: chatModel,
  });
  const chain = new LLMChain({ llm: chatModel, prompt, memory });

  const res1 = await chain.call({ input: "Is Aztreonam safe?" }); // Pass input correctly
  console.log("AI Response:", res1.text);

  console.log("\n--- Second Question (testing memory) ---");
  const res2 = await chain.call({ input: "What was the drug I just asked about?" });
  console.log("AI Response:", res2.text);
}

main();