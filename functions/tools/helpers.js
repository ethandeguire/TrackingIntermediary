// ----------------- helper functions -----------------

// sends a callback with a status code and the required headers
const callbackPackager = (callback, statCode, retobj) => {
  return callback(null, {
    statusCode: statCode,
    headers: { 'Access-Control-Allow-Credentials': 'true', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': '*', 'Content-Type': '*' },
    body: JSON.stringify(retobj)
  })
}


// ----------------- export the functions -----------------
exports.callbackPackager = callbackPackager
