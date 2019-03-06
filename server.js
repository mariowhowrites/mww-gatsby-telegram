const http = require('http')
const client = require('./AxiosClient').create()


http.createServer(sendMessage).listen(3000, () => console.log("listening now..."))

async function sendMessage(req, res) {
  if (req.method === 'POST') {
    let reqBody = '';

    req.on('data', chunk => {
      reqBody += chunk.toString();
    });

    req.on('end', () => {
      const inquiry = JSON.parse(reqBody).inquiry;

      sendRequest(inquiry).then(status => {
        if (status.data) {
          res.end("success")
        }

        res.end("failure")
      });
    });
  }
}

async function sendRequest(inquiry) {
  const body = {
    chat_id: '111658665',
    text: `newMessage: ${inquiry}`
  };
  
  return client.sendMessage(body)
}