const retryFetch = require("./retry-fetch");

async function fetchImages(mdBlocks) {
  const imageBlocks = mdBlocks.filter((block) => block.type === "image");

  const images = [];

  await Promise.all(
    imageBlocks.map(async (block) => {
      // regex to extract image url from markdown image syntax
      const url = block.parent.match(/(?<=\().+?(?=\))/)[0];

      // get uuid from url using regex
      const uuid = url.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/)[0];

      // get image name from url and remove query params
      const imageName = url.split("/").pop().split("?")[0];

      // fetch image file from url
      const image = await retryFetch(url);

      // create buffer from image file
      const buffer = await image.buffer();
      const imageBuffer = Buffer.from(buffer);
      const imageObject = {
        uuid,
        imageName,
        imageBuffer,
      };

      images.push(imageObject);

      // replace block url with local image path ./images/${uuid}-${imageName}
      block.parent = block.parent.replace(url, `images/${uuid}-${imageName}`);

      return block;
    })
  );

  return { mdBlocks, images };
}

module.exports = fetchImages;
