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

  var lastChecksum = "";
  var schedule;
  var trackId = document.documentElement.getAttribute("trackid");
  if (!trackId) {
    throw new Error(`Can't find trackid`);
  }
  poll("https://2019.jsconf.eu/schedule.json", function(url, text) {
    var s = JSON.parse(text);
    if (lastChecksum == s.info.checksum) {
      console.info("Schedule checksum unchanged");
      return;
    }
    lastChecksum = s.info.checksum;
    schedule = s;
    delete schedule.speakers; // Save some memory.
    draw();
  });

  var currentSession = "initial";
  function draw() {
    if (!schedule) {
      console.warn("No schedule available");
      return;
    }
    var today = schedule.schedule[schedule.info.currentDay];
    if (!today) {
      console.error(`Can't find schedule for today`);
    }
    var timeOfDay = getTimeOfDay();
    var startTimes = Object.keys(today);
    var current = startTimes[0];
    for (start of startTimes) {
      if (Number(start) <= timeOfDay) {
        current = start;
      }
      if (Number(start) > timeOfDay) {
        break;
      }
    }
    var sessions = today[current];
    var session = sessions.find(s => s.trackId == trackId && s.who != "all");
    if (currentSession == JSON.stringify(session)) {
      return;
    }
    currentSession = JSON.stringify(session);
    console.info(
      "current session changed",
      start,
      session == null ? "out of session" : "in session",
      session
    );
    var outOfSession = document.getElementById("out-of-session");
    outOfSession.style.display = session ? "none" : "block";
  }

  setInterval(draw, 2 * 1000);
})();
