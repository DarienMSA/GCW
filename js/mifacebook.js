window.fbAsyncInit = function () {
  FB.init({
    appId: '281803667170258',
    xfbml: true,
    version: 'v2.9'
  });
  FB.AppEvents.logPageView();
};

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function facebookShare(score) {
  FB.ui({
    method: 'share',
    href: 'http://google.com',
    hashtag: '#GardenRush',
    quote: '¡Mi puntuación en Garden Rush fue de: ' + score + "! \nEntra a jugar también."
  }, function (response) { });

}
