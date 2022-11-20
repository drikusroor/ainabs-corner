const { Client } = require("@notionhq/client");

function fetchNotionPosts(databaseId) {
  const notion = new Client({
    auth: process.env.NOTION_INTEGRATION_KEY,
  });

  return notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Name",
      rich_text: {
        is_not_empty: true,
      },
    },
  });
}

module.exports = fetchNotionPosts;