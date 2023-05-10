//click the body and close anything

const clickToClose = (show, setShow, container, containerClass, btnName) => {
  document.addEventListener("click", (e) => {
    if (e.target.closest(containerClass) === container.current) {
      if (e.target.closest(btnName)) {
        setShow(!show);
      } else {
        setShow(true);
      }
    } else {
      setShow(false);
    }
  });
};

// find the from how

function fromNow(
  date,
  nowDate = Date.now(),
  rft = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" })
) {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;
  const MONTH = 30 * DAY;
  const YEAR = 365 * DAY;
  const intervals = [
    { ge: YEAR, divisor: YEAR, unit: "year" },
    { ge: MONTH, divisor: MONTH, unit: "month" },
    { ge: WEEK, divisor: WEEK, unit: "week" },
    { ge: DAY, divisor: DAY, unit: "day" },
    { ge: HOUR, divisor: HOUR, unit: "hour" },
    { ge: MINUTE, divisor: MINUTE, unit: "minute" },
    { ge: 30 * SECOND, divisor: SECOND, unit: "seconds" },
    { ge: 0, divisor: 1, text: "just now" },
  ];
  const now =
    typeof nowDate === "object"
      ? nowDate.getTime()
      : new Date(nowDate).getTime();
  const diff =
    now - (typeof date === "object" ? date : new Date(date)).getTime();
  const diffAbs = Math.abs(diff);
  for (const interval of intervals) {
    if (diffAbs >= interval.ge) {
      const x = Math.round(Math.abs(diff) / interval.divisor);
      const isFuture = diff < 0;
      return interval.unit
        ? rft.format(isFuture ? x : -x, interval.unit)
        : interval.text;
    }
  }
}

//convert miniseconds into min

function msToMin(duration) {
  // milliseconds = Math.floor((duration % 1000) / 100),
  // milliseconds = Math.floor((duration % 1000) / 100),
  // hours = (hours < 10) ? "0" + hours : hours;

  let seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return minutes + ":" + seconds;
}

//convert miniseconds into hr and min

const msToHrmin = (duration) => {
  let minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  return hours + " hr " + minutes + " min";
};

// format the number

const formatNumber = (amount) => {
  const nf = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    roundingIncrement: 5,
  });

  return nf.format(amount).slice(1);
};

// averageColor code of images

const getAverageHex = (imgEl) => {
  var blockSize = 4, // only visit every 5 pixels
    defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
    canvas = document.createElement("canvas"),
    context = canvas.getContext && canvas.getContext("2d"),
    data,
    width,
    height,
    i = -4,
    length,
    rgb = { r: 0, g: 0, b: 0 },
    count = 0;

  if (!context) {
    return defaultRGB;
  }

  height = canvas.height =
    imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

  context.drawImage(imgEl, 0, 0);

  try {
    data = context.getImageData(0, 0, width, height);
  } catch (e) {
    /* security error, img on diff domain */
    console.log(e);
    return defaultRGB;
  }

  length = data.data.length;

  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  // ~~ used to floor values
  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);

  return (
    "#" +
    ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1)
  );
};

// date format

const dateFormat = (date) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date(date);

  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

// export all the functions

export {
  clickToClose,
  fromNow,
  msToMin,
  msToHrmin,
  formatNumber,
  getAverageHex,
  dateFormat,
};
