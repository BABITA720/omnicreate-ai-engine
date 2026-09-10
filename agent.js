import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Environment Validation
if (!process.env.GEMINI_API_KEY) {
  console.error("\x1b[31m❌ Configuration Error: GEMINI_API_KEY is missing from the environment variables.\x1b[0m");
  process.exit(1);
}

const ai = new GoogleGenAI();

// CLI Argument Parsing helper
const args = process.argv.slice(2);
const topicArg = args.find(arg => !arg.startsWith('--')) || "Enterprise AI Automation Suite";
const typeArgFlag = args.find(arg => arg.startsWith('--type='));
const contentType = typeArgFlag ? typeArgFlag.split('=')[1] : 'all';

async function runOmniCreateEngine() {
  const startTime = Date.now();
  console.log("\n\x1b[36m==================================================\x1b[0m");
  console.log("       🚀 OMNICREATE AI - ENTERPRISE ENGINE       ");
  console.log("\x1b[36m==================================================\x1b[0m");
  console.log(`[INFO] Target Topic : "${topicArg}"`);
  console.log(`[INFO] Format Scope : ${contentType.toUpperCase()}`);
  console.log(`[INFO] Model        : gemini-3.6-flash`);
  console.log("[INFO] Pipeline     : Initializing generation...\n");

  try {
    const systemPrompt = `
      You are OmniCreate AI, an elite Enterprise Solutions Architect and Content Director.
      Generate a comprehensive, high-impact content suite based on the project scope: "${topicArg}".
      
      Structure your response clearly with markdown headings depending on the requested scope (${contentType}):
      - Executive Summary & Value Proposition
      - Technical Architecture / Key Highlights
      - Professional Launch Social Media Posts (LinkedIn/Twitter)
      - Actionable Roadmap & Next Steps
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: systemPrompt,
    });

    const rawText = response.text;
    const wordCount = rawText.split(/\s+/).length;
    const timestamp = new Date().toISOString();

    // Professional Markdown Artifact with Frontmatter
    const markdownContent = `---
title: "OmniCreate Content Suite - ${topicArg}"
generated_at: "${timestamp}"
model: "gemini-3.6-flash"
scope: "${contentType}"
word_count: ${wordCount}
status: "production-ready"
---

# 🌟 Executive Content Suite: ${topicArg}

${rawText}

---
*Generated autonomously by OmniCreate AI Engine | Hackathon Edition*
`;

    // Structured JSON Artifact for API/Dashboard integration
    const jsonArtifact = {
      metadata: {
        topic: topicArg,
        timestamp,
        model: "gemini-3.6-flash",
        wordCount,
        format: contentType
      },
      content: rawText
    };

    // Safe File Naming
    const slug = topicArg.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const mdFileName = `omnicreate-${slug}.md`;
    const jsonFileName = `omnicreate-${slug}.json`;

    fs.writeFileSync(path.join(process.cwd(), mdFileName), markdownContent, 'utf-8');
    fs.writeFileSync(path.join(process.cwd(), jsonFileName), JSON.stringify(jsonArtifact, null, 2), 'utf-8');

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log("\x1b[32m--------------------------------------------------\x1b[0m");
    console.log(`\x1b[32m✅ SUCCESS! Artifacts generated in ${duration}s\x1b[0m`);
    console.log(`   📂 Markdown Export : ${mdFileName}`);
    console.log(`   📂 JSON Data Export: ${jsonFileName}`);
    console.log("\x1b[32m--------------------------------------------------\x1b[0m\n");

    console.log(rawText);
    console.log("\n\x1b[36m==================================================\x1b[0m");
    console.log("[INFO] Engine execution completed successfully.");
    console.log("\x1b[36m==================================================\x1b[0m\n");

  } catch (error) {
    console.error("\x1b[31m❌ Execution Error:\x1b[0m", error.message || error);
    process.exit(1);
  }
}

runOmniCreateEngine();

