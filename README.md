🚀 OmniCreate AI Agent | Enterprise Hackathon Edition
An elite, multi-format content generation and workflow automation engine powered by Google's Gemini SDK (gemini-3.6-flash).

🌟 Executive Overview
OmniCreate AI transforms raw project scopes or topics into production-ready artifacts in seconds. Designed for high-impact hackathon showcases, it acts as an autonomous enterprise architecture and content director, bridging AI generation with frontend-ready dashboard integration.

🛠️ Technology Stack
AI Core: Google Gemini API (gemini-3.6-flash) via @google/genai
Runtime: Node.js with ES Modules
Configuration: dotenv for secure environment isolation
Artifacts: Native Node.js fs and path modules
📂 Project Architecture
creditcoin-ai-agent/
├── agent.js              # Core CLI execution and multi-format engine
├── package.json          # Dependency manifest and project metadata
├── .env                  # Secure API credentials (keep private)
├── omnicreate-*.md       # Generated Markdown artifacts with frontmatter
└── omnicreate-*.json     # Generated structured JSON artifacts for APIs
⚙️ Setup
Install dependencies:

npm install
Create a .env file:

GEMINI_API_KEY=your_api_key_here
Run the agent:

node agent.js
Generated Markdown and JSON artifacts are written to the project directory.

🔐 Security
Never commit .env files or expose API keys in generated artifacts. Add credentials to your local environment and rotate any key that is accidentally disclosed.
