import axios from "axios";
import { Message } from "@prisma/client";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = process.env.REPO_OWNER;
const REPO_NAME = process.env.REPO_NAME;
const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`;

export const createGitHubIssue = async (message: Message, label?: string) => {
  try {
    console.log("Creating GitHub issue", { message, label });

    // Format the issue body
    const issueBody = `
**Author:** ${message.authorId}  
**Channel:** <#${message.channelId}>  
**Content:**  
${message.content}  

---
*Created from Discord message*
`;

    const response = await axios.post(
      API_URL,
      {
        title: message.content.substring(0, 100),
        body: issueBody,
        labels: label ? [label] : [],
      },
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      },
    );

    console.log("GitHub issue created:", response.data.html_url);
    return response.data;
  } catch (error) {
    console.error("Error creating GitHub issue:", error);
    throw error;
  }
};
