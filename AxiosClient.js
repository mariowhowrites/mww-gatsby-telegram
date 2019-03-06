const axios = require("axios")

module.exports = {
  create() {
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}`

    const client = Object.create(this.client)

    client.http = axios.create({
      baseURL: url,
      headers: {
        "Content-Type": "application/json",
      },
    })

    return client
  },

  client: {
    http: {},

    async sendMessage(body) {
      return await this.http.post("sendMessage", body)
    },

    async getUpdates() {
      return this.http.get("getUpdates")
    },
  },
}
