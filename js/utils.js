async function fetchData(streamer) {
  try {
    var data = await Promise.all([
      fetch(`https://twitch-proxy.freecodecamp.rocks/twitch-api/channels/${streamer}`).then((response) => response.json()),
      fetch(`https://twitch-proxy.freecodecamp.rocks/twitch-api/streams/${streamer}`).then((response) => response.json()),
    ])
    return data
  } catch (err) {
    console.log(err)
  }
}

// From Chris Z, https://davidwalsh.name/document-readystate
// utility for making sure document is ready
HTMLDocument.prototype.ready = function () {
  return new Promise(function (resolve, reject) {
    if (document.readyState === 'complete') {
      resolve(document);
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        resolve(document);
      });
    }
  });
}