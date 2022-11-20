function generateFrontMatter(post) {
  const title = post.properties.Name.title[0].plain_text;
  const titleMatter = `title: ${title}`;

  const date = post.created_time;
  const dateMatter = `date: ${date}`;

  const tags = post.properties.Tags.multi_select.map((tag) => `  - "${tag.name}"`).join("\n");
  const tagMatter = tags ? `tags:
${tags}` : '';

  const postId = post.id;
  const postIdMatter = `postId: ${postId}`;
  const url = post.url;
  const urlMatter = `url: ${url}`;
  const source = 'Notion';
  const sourceMatter = `source: ${source}`;

  const frontmatter = `---
${titleMatter}
${dateMatter}
${tagMatter}
${postIdMatter}
${urlMatter}
${sourceMatter}
---`;

  return frontmatter;
}

module.exports = generateFrontMatter;