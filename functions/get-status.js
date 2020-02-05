// import my functions
const helpers = require('./tools/helpers')
const callbackPackager = helpers.callbackPackager
const axios = require('axios')

// export our lambda function as named "handler" export
exports.handler = (event, context, callback) => {

  if (event.httpMethod == 'OPTIONS') return callbackPackager(callback, 200, { success: "OPTIONS request" })

  let params = event.queryStringParameters
  
  let courier = params["courier"]
  let trackingnum = params["trackingnum"]

  if (!courier || !trackingnum) {
    console.log('missing courier or trackingnum')
    return callbackPackager(callback, 400, { error: "courier and trackingnum must be query params" })
  }

  axios.get(`https://api.trackingmore.com/v2/trackings/${courier}/${trackingnum}`, {
    headers: {
      'Content-Type': 'application/text',
      'Trackingmore-Api-Key': '603256eb-c4d3-4cf4-bbd3-ca47da836aea'
    }
  })
    .then(res => {
      console.log("")
      return callbackPackager(callback, 200, res.data)
    })
    .catch(err => callbackPackager(callback, 500, {error: "something went wrong"}))
}