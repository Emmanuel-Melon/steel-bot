import axios from "axios";
import { Message } from "@prisma/client";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = process.env.REPO_OWNER;
const REPO_NAME = process.env.REPO_NAME;
const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`;

export const createGitHubIssue = async (message: Message) => {
  try {
    console.log("Creating GitHub issue", message);

    // Format the issue body
    const issueBody = `
**Author:** ${message.authorId}  
**Channel:** <#${message.channelId}>  
**Content:**  
${message.content}  

---

**Further Discussion:**  
[Join the Discord server](https://discord.gg/your-invite-link)  
[View the original message](https://discord.com/channels/your-server-id/${message.channelId}/${message.messageId})
        `;

    const response = await axios.post(
      API_URL,
      {
        title: `[${message.type}] ${message.content.substring(0, 50)}`,
        body: issueBody,
        labels: [message.type.toLowerCase()],
      },
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    console.log("GitHub Response", response);
    return response.data;
  } catch (error) {
    console.error("Failed to create GitHub issue:", error);
    throw error;
  }
};
