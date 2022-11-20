const fs = require("fs");
const { NotionToMarkdown } = require("notion-to-md");
const { Client } = require("@notionhq/client");
const fetchNotionPosts = require("./api/fetch-db-posts");
require("dotenv").config();

async function main() {
  if (!process.env.NOTION_INTEGRATION_KEY) {
    throw new Error("NOTION_INTEGRATION_KEY is not defined");
  }

  if (!process.env.NOTION_DATABASE_ID) {
    throw new Error("NOTION_DATABASE_ID is not defined");
  }

  const notion = new Client({
    auth: process.env.NOTION_INTEGRATION_KEY,
  });
  const n2m = new NotionToMarkdown({ notionClient: notion });

  const posts = await fetchNotionPosts(process.env.NOTION_DATABASE_ID);

  posts.results.forEach(async (post) => {
    const mdBlocks = await n2m.pageToMarkdown(post.id);
    const mdString = n2m.toMarkdownString(mdBlocks);

    const title = post.properties.Name.title[0].plain_text;
    const kebabTitle = title.replace(/\s+/g, "-").toLowerCase();
    const path = "../content/posts";
    const filename = `${path}/${kebabTitle}/index.md`;

    console.log(post.properties);

    const tags = post.properties.Tags.multi_select.map((tag) => tag.name);
    const date = post.created_time;

    const frontmatter = `---
title: ${title}
date: ${date}
tags: ${tags}
---`;

    const content = `${frontmatter}

${mdString}`;

    fs.mkdirSync(`${path}/${kebabTitle}`, { recursive: true });
    fs.writeFile(filename, content, (err) => {
      console.log(err);
    });
  });
}

main();
