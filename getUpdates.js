const client = require("./AxiosClient").create()

async function getUpdates(req, res) {
  return client.getUpdates()

  // res.setHeader('Content-Type', 'application/json')

  // res.end(JSON.stringify(response))
}

getUpdates().then(res => console.log(res.data.result[0]))
