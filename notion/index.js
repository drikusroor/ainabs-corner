const fs = require("fs");
const { NotionToMarkdown } = require("notion-to-md");
const { Client } = require("@notionhq/client");
const fetchNotionPosts = require("./api/fetch-db-posts");
const fetchBlockImages = require("./helpers/fetch-images");
const generateFrontMatter = require("./helpers/generate-front-matter");
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

  posts.results
    .filter((post) => post.properties.Status?.status?.name === "Published")
    .forEach(async (post, i) => {
      const rawMdBlocks = await n2m.pageToMarkdown(post.id);
      const { mdBlocks, images } = await fetchBlockImages(rawMdBlocks);

      const mdString = n2m.toMarkdownString(mdBlocks);

      const title = post.properties.Name.title.map(t => t.plain_text).join('');

      console.log(`Fetching post ${i + 1}: ${title}`)

      const kebabTitle = title.replace(/\s+/g, "-").toLowerCase();
      const path = "../content/posts";
      const filename = `${path}/${kebabTitle}/index.md`;

      const frontmatter = generateFrontMatter(post);

      const content = `${frontmatter}

${mdString}`;

      fs.mkdirSync(`${path}/${kebabTitle}`, { recursive: true });
      fs.writeFile(filename, content, (err) => {
        if (err) {
          console.log(err);
        }
      });

      images.forEach((image) => {
        const imageDir = `${path}/${kebabTitle}/images`;
        fs.mkdirSync(imageDir, { recursive: true });
        fs.writeFile(
          `${imageDir}/${image.uuid}-${image.imageName}`,
          image.imageBuffer,
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
      });
    });
}

main();
