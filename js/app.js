const main = async () => {
  await document.ready()
  await loadStreamers()
  $('.overlay').fadeOut('slow') // TODO remove jQuery
}
main()


async function loadStreamers() {
  const streamers = [
    "cretetion",
    "freecodecamp",
    "jonsandman",
    "rocketleague",
    "ESL_SC2",
    "Bacon_Donut",
    "highdistortion",
    "crashcreeley",
    "RobotCaleb",
    "noobs2ninjas",
    "QuickyBaby",
    "terakilobyte",
    "thomasballinger",
    "comster404",
    "deethane",
    "ZeeooN",
    "Wyld",
    "BySliDe",
    "scrubkillarl_",
    "GronkhTV"
  ]

  for (let streamer of streamers) {
    let data = await fetchData(streamer)
    console.log(streamer, data)

    let channel = data[0]
    let stream = data[1].stream


    // TODO handle stream checking logic in another function

    // invalid streamer
    if (channel.error) {
      let logo = 'https://s10.postimg.org/rfebq9se1/random-user-icon-15571.png'
      $('#invalid-streams').append(`
        <div class="stream-container">
          <div class="stream">
            <img src="${logo}"/>
            <span class="channel">${streamer}</span>
            <span class="status">Invalid Account</span>
          </div>
        </div>
      `) // TODO remove jQuery  
      continue
    }

    // currently streaming
    if (stream) {
      let logo = stream.channel.logo || 'https://s10.postimg.org/rfebq9se1/random-user-icon-15571.png'
      let game = 'playing ' + stream.channel.game
      if (game.length > 25) game.slice(0, 25).append('...')

      $('#online-streams').append(`
        <div class="stream-container">
          <div class="stream">
            <img src="${logo}"/>
            <span class="channel">${stream.channel.display_name}</span>
            <span class="game">${game}</span>
          </div>
        </div>
      `) // TODO remove jQuery
      continue
    }

    // currently offline
    else {
      let logo = channel.logo || 'https://s10.postimg.org/rfebq9se1/random-user-icon-15571.png'
      $('#offline-streams').append(`
        <div class="stream-container">
          <div class="stream">
            <img src="${logo}"/>
            <span class="channel">${channel.name}</span>
            <span class="status"><span class="square"></span> Offline</span>
          </div>
        </div>
      `) // TODO remove jQuery
      continue
    }
  }
}



// $(document).ready(function() {
//   window.onload = () => {
    
    
//   }

//   //Get data from Twitch api
  

//   streamers.forEach(streamer => {
//     getStream(streamer)
//   })

  //Toggle menu on small devices
  var toggle = false;
  $('.toggle').click(function() {
    $('#side-panel').css('width', '240px');
    $('#content').css('width', 'calc(100% - 240px)');
    $('#content').css('margin-left', '240px');
    $('#side-panel *').css('display','block');
    $('.toggle').css('display','none');
    toggle = true;
  });
  $('#content').click(function() {
    if (toggle === true) {
      $('#side-panel').css('width', '40px');
      $('#content').css('width', 'calc(100% - 40px)');
      $('#content').css('margin-left', '40px');
      $('#side-panel *').css('display','none');
      $('.toggle').css('display','block');
      toggle = false;
    }
  });

  //Event handler for streamer panel
  $(document.body).on('click', '.stream-container', function() {
    if ($(this).parent().is('#offline-streams')) {
      var streamer = $(this).find('.channel').text();
      window.open('https://www.twitch.tv/' + streamer + '/profile', '_blank');
    } else if ($(this).parent().is('#online-streams')) {
      var streamer = $(this).find('.channel').text();
      $('iframe').attr('src', 'https://player.twitch.tv/?channel=' + streamer);
      $('#welcome').addClass('hidden');
      $('#embed').removeClass('hidden');
    }
  });  

//   function getStream(streamer) {
//   }
// });
