const axios = require("axios");
const fs = require("fs");

// Change this to match mod id
const modId = "abcxyz";

async function getFileString(path, fileType) {
  const dir = await fs.promises.readdir(path, { withFileTypes: true });
  let str = "";
  for (const dirent of dir) {
    if (dirent.name.endsWith(fileType)) {
      const fileString = fs.readFileSync(`${path}/${dirent.name}`, "utf-8");
      str += `\n${fileString}`;
    }
  }
  return str;
}

async function init() {
  const rawCss = await getFileString("./dist/css", "css");
  const rawJs = await getFileString("./dist/js", "js");
  return axios({
    method: "put",
    url: `https://api.anymod.com/v0/mods/${modId}`,
    headers: {
      authorization: `Bearer ${process.env.ANYMOD_UPDATE_TOKEN}`,
    },
    data: {
      rawHtml: `<div id="${modId}"></div>`,
      rawCss,
      rawJs,
    },
  })
    .then(process.exit)
    .catch((error) => {
      console.log(error.message);
      process.exit();
    });
}

module.exports = { init, modId };
