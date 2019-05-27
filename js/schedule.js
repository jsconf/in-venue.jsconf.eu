navigator.serviceWorker.register("/sw.js");

var overriddenTimeOfDay = null;

(function() {
  function getTimeOfDay() {
    if (overriddenTimeOfDay) {
      return overriddenTimeOfDay;
    }
    var d = new Date();
    return Number(d.getHours() + "." + d.getMinutes());
  }

  var trackControl;
  var trackId = document.documentElement.getAttribute("trackid");
  if (!trackId) {
    throw new Error(`Can't find trackid`);
  }

  var lastTrackControl;
  poll("/track-control.json", function(url, text) {
    if (text == lastTrackControl) {
      return;
    }
    lastTrackControl = text;
    var t = JSON.parse(text);
    trackControl = t;
    draw();
  });

  var currentSession = "initial";
  function draw() {
    if (!trackControl) {
      console.warn("No track control available");
      return;
    }
    var timeOfDay = getTimeOfDay();
    var control = trackControl[trackId];

    var nextOrCurrentSessionIsInFuture = false;
    if (control.nextOrCurrentSessionStartTime > timeOfDay) {
      nextOrCurrentSessionIsInFuture = true;
    }
    var outOfSession = document.getElementById("out-of-session");
    outOfSession.style.display = nextOrCurrentSessionIsInFuture
      ? "block"
      : "none";
  }

  setInterval(draw, 1 * 1000);
})();
