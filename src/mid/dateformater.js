export function formatDate(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function parseDate(stringDate) {
  const parts = stringDate.split(/[\/\s:]/);
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  const hours = parseInt(parts[3], 10);
  const minutes = parseInt(parts[4], 10);

  const parsedDate = new Date(year, month, day, hours, minutes);

  return parsedDate.getTime();
}

export function calculateTimeDifference(selectedDate, timeInMilliseconds) {
  const currentTime = Date.now();
  const difference = currentTime - selectedDate;

  console.log(difference);
  console.log(timeInMilliseconds);

  return difference >= timeInMilliseconds;
}
