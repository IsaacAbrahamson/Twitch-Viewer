$(document).ready(function() {
  //Page Load
  jQuery(window).load(function() {
    $('.overlay').fadeOut('slow');
  });

  //Get data from Twitch api
  var streamers = ["cretetion", "freecodecamp", "storbeck", "brunofin", "ESL_SC2", "Bacon_Donut", "habathcx", "OgamingSC2", "RobotCaleb", "noobs2ninjas", "QuickyBaby", "terakilobyte", "thomasballinger", "comster404", "itmeJP", "ZeeooN", "HiRezTV", "Wyld", "BySliDe", "Armor_tv", "GronkhTV"];
  for (var index = 0; index < streamers.length; index++) {
    getStream(streamers[index]);
  }

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

  function getStream(streamer) {
    var channel = '';
    var game = '';
    var logo = '';
    var link = '';

    $.getJSON('https://api.twitch.tv/kraken/channels/' + streamer + '?callback=?', function(object) {
      if (object.status === 422) { //Invalid Channel
        channel = streamer;
        logo = 'https://dl.dropbox.com/s/hryv6j9he297dw2/Octagon_delete.svg.png?dl=0';
        $('#invalid-streams').append('<div class="stream-container"><div class="stream"><img src="' + logo + '"/><span class="channel">' + channel + '</span><span class="status">Invalid Account</span></div></div>');
      }
      return;
    });

    $.getJSON('https://api.twitch.tv/kraken/streams/' + streamer + '?callback=?', function(object) {
      if (object.stream === null) { //Channel Offline
        $.getJSON('https://api.twitch.tv/kraken/channels/' + streamer + '?callback=?', function(object) {
          channel = object.name;
          game = 'Offline';
          logo = object.logo;
          if (logo == null) {
            logo = 'https://dl.dropbox.com/s/qlsdayh2gxakko4/User_font_awesome.svg.png?dl=0';
          }
          link = object.url;
          $('#offline-streams').append('<div class="stream-container"><div class="stream"><img src="' + logo + '"/><span class="channel">' + channel + '</span><span class="status"><span class="square"></span> Offline</span></div></div>');
          return;
        });
      } else { //Channel Live
        channel = object.stream.channel.display_name;
        game = object.stream.channel.game;
        game = 'playing ' + game;
        var gameName = '';
        if (game.length > 25) {
          console.log(game);
          gameName = game.slice(0, 25);
          gameName += '...';
        } else {
          gameName = game;
        }
        logo = object.stream.channel.logo;
        if (logo == null) {
          logo = 'https://dl.dropbox.com/s/qlsdayh2gxakko4/User_font_awesome.svg.png?dl=0';
        }
        link = object.stream.channel.url;
        $('#online-streams').append('<div class="stream-container"><div class="stream"><img src="' + logo + '"/><span class="channel">' + channel + '</span><span class="game">' + gameName + '</span></div></div>');
        return;
      }
    });
  }
});
