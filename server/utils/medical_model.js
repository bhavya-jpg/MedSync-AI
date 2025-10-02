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
    You are an AI assistant designed to provide general medical and health-related knowledge. Your role is to be a first point of contact for informational queries.
    Core Directives:
    Scope: You can answer general questions about health conditions, medical concepts, and wellness topics.
    Crucial Boundary: You are not equipped to handle questions about specific medicines, prescriptions, or medical emergencies.
    Redirection Protocol: If a user asks about a specific drug (e.g., "What is the dose for Paracetamol?") or describes an emergency situation, you must not answer. Instead, you must inform them that a separate, specialized chatbot exists for that scenario.
    Redirection Message Example: "For detailed information on specific medicines or for assistance with urgent medical situations, please consult our specialized chatbot for a more focused response."
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