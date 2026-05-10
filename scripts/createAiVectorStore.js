require("dotenv").config();

const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const KNOWLEDGE_DIR = path.resolve(__dirname, "../ai-knowledge");

const main = async () => {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error("Missing OPENAI_API_KEY in .env");
    }

    const vectorStore = await openai.vectorStores.create({
        name: "PTIT LMS Knowledge Base",
    });

    console.log("Vector Store ID:", vectorStore.id);

    const files = fs
        .readdirSync(KNOWLEDGE_DIR)
        .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".txt") || fileName.endsWith(".pdf"));

    for (const fileName of files) {
        const filePath = path.join(KNOWLEDGE_DIR, fileName);

        console.log("Uploading:", fileName);

        const uploadedFile = await openai.files.create({
            file: fs.createReadStream(filePath),
            purpose: "assistants",
        });

        await openai.vectorStores.files.create(vectorStore.id, {
            file_id: uploadedFile.id,
        });

        console.log("Uploaded:", fileName, uploadedFile.id);
    }

    console.log("\nDONE");
    console.log("Copy dòng này vào file .env:");
    console.log(`OPENAI_VECTOR_STORE_ID=${vectorStore.id}`);
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});