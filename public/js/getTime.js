function convertUtcToLocal(utcTimestamp) {
  // Create a Date object from the UTC timestamp
  const utcDate = new Date(utcTimestamp);

  // Convert UTC time to local time
  const localDate = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
  }).format(utcDate);

  return localDate;
}

let time = document.querySelectorAll("#time");
time.forEach((element) => {
  element.textContent = convertUtcToLocal(element.innerHTML);
})