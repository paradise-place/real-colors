import fs from 'fs'

const ARCHIVE_PATH = './static/archive/'

const dir = await fs.promises.readdir( ARCHIVE_PATH )

const imgs = dir.reduce((prev, curr, i) => {
  const filename = /(.*)_user_(.*)_end__id_(.*)_end_/
  const match = curr.match(filename)
  const date = match[1]
  const name = match[2]
  const id = match[3]
  const img = `
  <div class="container">
    <img class="image" src="${ARCHIVE_PATH}${curr}">
    <div class="author">by: ${name}</div>
    <div class="date">${date}</div>
  </div>`
  return prev + img
}, "");

const page = `
<!-- this file is generated from generate.mjs -->

<head>
  <title>real-colors</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
${imgs}
</body>`

await fs.promises.writeFile("./index.html", page)