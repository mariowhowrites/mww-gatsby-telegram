const client = require("./AxiosClient").create()

module.exports = sendMessage

async function sendMessage(req, res) {
  let headers = {}

  headers["Access-Control-Allow-Origin"] = "*"
  headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS"
  headers["Access-Control-Allow-Headers"] = "Content-Type"
  headers["Access-Control-Max-Age"] = 2592000 // 30 days

  if (req.method === "OPTIONS") {
    res.writeHead(200, headers)

    res.end()

    return
  }

  if (req.method === "POST") {
    res.setHeader("Content-Type", "text/plain")

    let reqBody = ""

    req.on("data", chunk => {
      reqBody += chunk.toString()
    })

    req.on("end", () => {
      sendMessageRequest(reqBody)
        .then(response => {
          const status = response.data ? "success" : "failure"

          res.writeHead(200, headers)

          res.end(status)
        })
        .catch(error => console.log(error))
    })
  }
}

async function sendMessageRequest(reqBody) {
  const inquiry = JSON.parse(reqBody).inquiry

  const body = {
    chat_id: "111658665",
    text: `newMessage: ${inquiry}`,
  }

  return client.sendMessage(body)
}

