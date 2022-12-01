function generateFrontMatter(post) {
  const title = post.properties.Name.title.map(t => t.plain_text).join('');
  const titleMatter = `title: ${title}`;

  const date = post.created_time;
  const dateMatter = `date: ${date}`;

  const featuredImage = post.cover
    ? post.cover.external.url
      ? post.cover.external.url
      : post.cover.url
    : null;
  const featuredImageMatter = `featured_image: ${featuredImage}`;

  const tags = post.properties.Tags?.multi_select
    .map((tag) => `  - "${tag.name}"`)
    .join("\n");
  const tagMatter = tags
    ? `tags:
${tags}`
    : "";

  const categories = post.properties.Category?.multi_select
    .map((category) => `  - "${category.name}"`)
    .join("\n");
  const categoryMatter = categories
    ? `categories:
${categories}`
    : "";

  const postId = post.id;
  const postIdMatter = `postId: ${postId}`;
  const url = post.url;
  const _urlMatter = `url: ${url}`;
  const source = "Notion";
  const sourceMatter = `source: ${source}`;

  const frontmatter = `---
${titleMatter}
${dateMatter}
${categoryMatter}
${tagMatter}
${postIdMatter}
${sourceMatter}
${featuredImageMatter}
---`;

  return frontmatter;
}

module.exports = generateFrontMatter;
