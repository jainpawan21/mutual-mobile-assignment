export const weekDay = {
  Mon: 0,
  "Mon,": 0,
  Tue: 1,
  "Tue,": 1,
  Wed: 2,
  "Wed,": 2,
  Thu: 3,
  "Thu,": 3,
  Fri: 4,
  "Fri,": 4,
  Sat: 5,
  "Sat,": 5,
  Sun: 6,
  "Sun,": 6,
};

export function extractTime(timeString) {
  // console.log(timeString)
  var time = [
    { startTime: null, endTime: null },
    { startTime: null, endTime: null },
    { startTime: null, endTime: null },
    { startTime: null, endTime: null },
    { startTime: null, endTime: null },
    { startTime: null, endTime: null },
    { startTime: null, endTime: null },
  ];
  const temp = timeString.split("/");
  for (var i = 0; i < temp.length; i++) {
    var startTime, endTime;
    // console.log(temp[i].split(" "))
    var splitOnSpace = temp[i].split(" ");
    var timeCounter = 0;
    for (var j = 0; j < splitOnSpace.length; j++) {
      if (splitOnSpace[j] === "am" || splitOnSpace[j] === "pm") {
        if (timeCounter === 0) {
          startTime = splitOnSpace[j - 1].includes(":")
            ? splitOnSpace[j] === "pm"
              ? splitOnSpace[j - 1].split(":")[0] !== "12"
                ? parseInt(splitOnSpace[j - 1].split(":")[0]) +
                  12 +
                  ":" +
                  splitOnSpace[j - 1].split(":")[1] +
                  ":00"
                : parseInt(splitOnSpace[j - 1].split(":")[0]) +
                  ":" +
                  splitOnSpace[j - 1].split(":")[1] +
                  ":00"
              : splitOnSpace[j - 1].split(":")[0] === "12"
              ? 0 + ":" + splitOnSpace[j - 1].split(":")[1] + ":00"
              : splitOnSpace[j - 1].split(":")[0] +
                ":" +
                splitOnSpace[j - 1].split(":")[1] +
                ":00"
            : splitOnSpace[j] === "pm"
            ? splitOnSpace[j - 1] !== "12"
              ? parseInt(splitOnSpace[j - 1]) + 12 + ":00:00"
              : parseInt(splitOnSpace[j - 1]) + ":00:00"
            : splitOnSpace[j - 1] === "12"
            ? 0 + ":00:00"
            : parseInt(splitOnSpace[j - 1]) + ":00:00";
          timeCounter++;
        } else {
          endTime = splitOnSpace[j - 1].includes(":")
            ? splitOnSpace[j] === "pm"
              ? splitOnSpace[j - 1].split(":")[0] !== "12"
                ? parseInt(splitOnSpace[j - 1].split(":")[0]) +
                  12 +
                  ":" +
                  splitOnSpace[j - 1].split(":")[1] +
                  ":00"
                : parseInt(splitOnSpace[j - 1].split(":")[0]) +
                  ":" +
                  splitOnSpace[j - 1].split(":")[1] +
                  ":00"
              : splitOnSpace[j - 1].split(":")[0] === "12"
              ? 0 + ":" + splitOnSpace[j - 1].split(":")[1] + ":00"
              : splitOnSpace[j - 1].split(":")[0] +
                ":" +
                splitOnSpace[j - 1].split(":")[1] +
                ":00"
            : splitOnSpace[j] === "pm"
            ? splitOnSpace[j - 1] !== "12"
              ? parseInt(splitOnSpace[j - 1]) + 12 + ":00:00"
              : parseInt(splitOnSpace[j - 1]) + ":00:00"
            : splitOnSpace[j - 1] === "12"
            ? 0 + ":00:00"
            : parseInt(splitOnSpace[j - 1]) + ":00:00";
        }
      }
      if (splitOnSpace[j] === "" || splitOnSpace[j] === " ") {
        if (j === 0) {
          splitOnSpace.splice(0, 1);
        } else {
          splitOnSpace.splice(j, j);
        }
      }
    }
    splitOnSpace.splice(splitOnSpace.length - 5, 5);
    for (var j = 0; j < splitOnSpace.length; j++) {
      if (splitOnSpace[j].length > 4) {
        const weekDaySplit = splitOnSpace[j].split("-");
        for (
          var k = weekDay[weekDaySplit[0]];
          k <= weekDay[weekDaySplit[1]];
          k++
        ) {
          time[k] = { startTime: startTime, endTime: endTime };
        }
        // time.push({ k:  });
      } else {
        time[weekDay[splitOnSpace[j]]] = {
          startTime: startTime,
          endTime: endTime,
        };
      }
    }
    // console.info(splitOnSpace)
  }
  return time;
}

export const checkOpen = (cardTime, time) => {
  if (
    Date.parse("01/01/2020 " + time) >=
      Date.parse("01/01/2020 " + cardTime.startTime) &&
    Date.parse("01/01/2020 " + time) <=
      Date.parse("01/01/2020 " + cardTime.endTime)
  ) {
    return true;
  }
  return false;
};

export function getDate(date) {
  const year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = month > 10 ? month : "0" + month;
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var hours = date.getHours();
  hours = hours < 10 ? "0" + hours : hours;
  var minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var seconds = date.getSeconds();
  seconds = seconds < 10 ? "0" + seconds : seconds;
  const mydate = {
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
  };
  return mydate;
}
