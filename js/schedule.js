navigator.serviceWorker.register("/sw.js");

(function() {
  function getTimeOfDay() {
    return 11.3;
    var d = new Date();
    return Number(d.getHours() + "." + d.getMinutes());
  }

  var lastChecksum = "";
  var trackId = document.documentElement.getAttribute("trackid");
  if (!trackId) {
    throw new Error(`Can't find trackid`);
  }
  poll("https://2019.jsconf.eu/schedule.json", function(url, text) {
    var schedule = JSON.parse(text);
    if (lastChecksum == schedule.info.checksum) {
      console.info("Schedule checksum unchanged");
      return;
    }
    lastChecksum = schedule.info.checksum;

    var today = schedule.schedule[schedule.info.currentDay];
    if (!today) {
      console.error(`Can't find schedule`);
    }
    var timeOfDay = getTimeOfDay();
    var startTimes = Object.keys(today);
    console.info("start times today", startTimes);
    var current = startTimes[0];
    for (start of startTimes) {
      if (Number(start) >= timeOfDay) {
        current = start;
      }
      if (Number(start) > timeOfDay) {
        break;
      }
    }
    console.info("Current start time", start);
    var sessions = today[current];
    console.info("sessions", sessions, today);
    var session = sessions.find(s => s.trackId == trackId && s.who != "all");
    console.info("current session", session != null, session);
  });
})();
