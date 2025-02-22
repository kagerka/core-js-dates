/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 *
 * @param {string} date - date and time.
 * @return {number} milliseconds in timestamp.
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 0
 * '04 Dec 1995 00:12:00 UTC' => 818035920000
 */
function dateToTimestamp(date) {
  const time = new Date('01 Jan 1970 00:00:00 UTC');
  const givenDate = new Date(date);
  const result = givenDate - time;
  return result;
}

/**
 * Returns the time in hh:mm:ss format from the received date.
 *
 * @param {Date} date - date.
 * @return {string} time in hh:mm:ss format.
 *
 * @example:
 * Date(2023, 5, 1, 8, 20, 55) => '08:20:55'
 * Date(2015, 10, 20, 23, 15, 1) => '23:15:01'
 */
function getTime(date) {
  const fn = (num) => {
    return num.toString().padStart(2, '0');
  };
  const hours = fn(date.getHours());
  const minutes = fn(date.getMinutes());
  const seconds = fn(date.getSeconds());
  const result = `${hours}:${minutes}:${seconds}`;
  return result;
}

/**
 * Returns the name of the day of the week for a given date string.
 *
 * @param {string} date - date and time.
 * @return {string} the name of the day of the week
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 'Thursday'
 * '03 Dec 1995 00:12:00 UTC' => 'Sunday'
 * '2024-01-30T00:00:00.000Z' => 'Tuesday'
 */
function getDayName(date) {
  const givenDate = new Date(date);
  const weekDay = givenDate.getDay();
  let result = '';
  switch (weekDay) {
    case 0:
      result = 'Sunday';
      break;
    case 1:
      result = 'Monday';
      break;
    case 2:
      result = 'Tuesday';
      break;
    case 3:
      result = 'Wednesday';
      break;
    case 4:
      result = 'Thursday';
      break;
    case 5:
      result = 'Friday';
      break;
    case 6:
      result = 'Saturday';
      break;
    default:
      break;
  }
  return result;
}

/**
 * Returns the date of the next Friday from a given date.
 *
 * @param {Date} date
 * @return {Date}
 *
 * @example:
 * Date('2024-02-03T00:00:00Z') => Date('2024-02-09T00:00:00Z')
 * Date('2024-02-13T00:00:00Z') => Date('2024-02-16T00:00:00Z')
 * Date('2024-02-16T00:00:00Z') => Date('2024-02-23T00:00:00Z')
 */
function getNextFriday(date) {
  const givenDate = new Date(date);
  let weekDay = givenDate.getDay();
  let result;
  while (weekDay < 4 || weekDay > 4) {
    weekDay = givenDate.getDay();
    result = givenDate.setDate(givenDate.getDate() + 1);
  }
  return new Date(result);
}

/**
 * Returns the number of days in a specified month and year.
 *
 * @param {number} month - The month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The year as a four-digit number.
 * @return {number}
 *
 * @example:
 * 1, 2024 => 31
 * 2, 2024 => 29
 */
function getCountDaysInMonth(month, year) {
  const givenDate = new Date(`${year}:${month.toString().padStart(2)}`);
  const givenDay = givenDate.getDate();
  const tempDate = new Date(givenDate.setDate(givenDate.getDate() + 30));
  const tempDay = tempDate.getDate();
  let result;
  if (tempDay === 31) {
    result = 31;
  } else if (givenDay < tempDay && month === 2) {
    result = 31 - tempDay;
  } else {
    result = 30;
  }
  return result;
}

/**
 * Returns the total number of days between two dates, including both the start and end dates.
 *
 * @param {string} dateStart - The start date of the period in ISO 8601 format.
 * @param {string} dateEnd - The end date of the period in ISO 8601 format.
 * @return {number} - The total count of days in the period.
 *
 * @example:
 * '2024-02-01T00:00:00.000Z', '2024-02-02T00:00:00.000Z'  => 2
 * '2024-02-01T00:00:00.000Z', '2024-02-12T00:00:00.000Z'  => 12
 */
function getCountDaysOnPeriod(dateStart, dateEnd) {
  const startDate = new Date(dateStart);
  const endDate = new Date(dateEnd);
  const result = (endDate - startDate) / (24 * 60 * 60 * 1000) + 1;
  return result;
}

/**
 * Returns true if a given date is within a specified range, including both the start and end dates.
 *
 * @typedef {{
 * start: string, // The start date in ISO 8601 format (e.g., 'YYYY-MM-DD').
 * end: string    // The end date in ISO 8601 format.
 * }} DatePeriod
 *
 * @param {string} date - The date to check, in ISO 8601 format.
 * @param {DatePeriod} period - The period to check against.
 * @return {boolean} - True if the date is within the range, false otherwise.
 *
 * @example:
 * '2024-02-01', { start: '2024-02-02', end: '2024-03-02' } => false
 * '2024-02-02', { start: '2024-02-02', end: '2024-03-02' } => true
 * '2024-02-10', { start: '2024-02-02', end: '2024-03-02' } => true
 */
function isDateInPeriod(date, period) {
  const givenDate = new Date(date).getTime();
  let startDate = new Date(period.start).getTime();
  const endDate = new Date(period.end).getTime();
  let result;

  while (startDate < givenDate || startDate < endDate) {
    if (givenDate === startDate) {
      result = true;
      return true;
    }
    startDate = new Date(startDate).setTime(
      new Date(startDate).getTime() + 24 * 60 * 60 * 1000
    );
    result = false;
  }
  return result;
}

/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 *
 * @param {string} date - The date to be formatted, in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @return {string} - The date formatted in 'Month/Day/Year, Hour:Minute:Second AM/PM'.
 *
 * @example:
 * '2024-02-01T15:00:00.000Z' => '2/1/2024, 3:00:00 PM'
 * '1999-01-05T02:20:00.000Z' => '1/5/1999, 2:20:00 AM'
 * '2010-12-15T22:59:00.000Z' => '12/15/2010, 10:59:00 PM'
 */
function formatDate(date) {
  const givenDate = new Date(date);
  const month = givenDate.getMonth() + 1;
  const day = givenDate.getUTCDate();
  const year = givenDate.getFullYear();
  let hours = givenDate.getUTCHours();
  const minutes = givenDate.getMinutes().toString().padStart(2, '0');
  const seconds = givenDate.getSeconds().toString().padStart(2, '0');

  let amPm;
  if (hours < 12) {
    amPm = 'AM';
  } else {
    hours -= 12;
    amPm = 'PM';
  }
  if (hours === 0) {
    hours = 12;
  }
  const result = `${month}/${day}/${year}, ${hours}:${minutes}:${seconds} ${amPm}`;
  return result;
}

/**
 * Returns the total number of weekend days (Saturdays and Sundays) in a specified month and year.
 *
 * @param {number} month - The source month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The source year as a four-digit number.
 * @return {number} - The total count of weekend days in the month.
 *
 * @example:
 * 5, 2022 => 9
 * 12, 2023 => 10
 * 1, 2024 => 8
 */
function getCountWeekendsInMonth(month, year) {
  const date = new Date(year, month - 1, 1);
  let weekends = 0;
  const daysInMonth = new Date(year, month, 0).getDate();
  for (let i = date.getDate(); i <= daysInMonth; i += 1) {
    if (date.getDay() === 6 || date.getDay() === 0) {
      weekends += 1;
    }
    date.setDate(date.getDate() + 1);
  }
  return weekends;
}

/**
 * Returns the week number of the year for a given date.
 * The first week is the one that falls on January 1.
 * The first day of the week is Monday.
 *
 * @param {Date} date - The date for which to find the week number.
 * @return {number} - The week number of the year.
 *
 * @example:
 * Date(2024, 0, 3) => 1
 * Date(2024, 0, 31) => 5
 * Date(2024, 1, 23) => 8
 */
function getWeekNumberByDate(date) {
  const givenDate = new Date(date);
  const yearBegin = new Date(date.getFullYear(), 0, 1);
  const start = yearBegin.getTime();
  const end = givenDate.getTime();
  let weeks = 1;
  for (let i = start; i <= end; i += 24 * 60 * 60 * 1000) {
    if (new Date(i).getDay() === 1) {
      weeks += 1;
    }
  }
  if (new Date(start).getDay() === 1) {
    weeks -= 1;
  }
  return weeks;
}

/**
 * Returns the date of the next Friday the 13th from a given date.
 * Friday the 13th is considered an unlucky day in some cultures.
 *
 * @param {Date} date - The starting date to search from.
 * @return {Date} - The date of the next Friday the 13th.
 *
 * @example:
 * Date(2024, 0, 13) => Date(2024, 8, 13)
 * Date(2023, 1, 1) => Date(2023, 9, 13)
 */
function getNextFridayThe13th(date) {
  let tempDate = new Date(date).getTime();
  const condition = true;
  while (condition) {
    tempDate += 24 * 60 * 60 * 1000;
    if (
      new Date(tempDate).getDay() === 5 &&
      new Date(tempDate).getDate() === 13
    ) {
      return new Date(tempDate);
    }
  }
  return new Date(tempDate);
}

/**
 * Returns the quarter of the year for a given date.
 *
 * @param {Date} date - The date for which to find the quarter.
 * @return {number} - The quarter of the year (1-4).
 *
 * @example:
 * Date(2024, 1, 13) => 1
 * Date(2024, 5, 1) => 2
 * Date(2024, 10, 10) => 4
 */
function getQuarter(date) {
  const month = new Date(date).getMonth();
  let result = 0;
  if (month >= 0 && month <= 2) {
    result = 1;
  }
  if (month >= 3 && month <= 5) {
    result = 2;
  }
  if (month >= 6 && month <= 8) {
    result = 3;
  }
  if (month >= 9 && month <= 11) {
    result = 4;
  }
  return result;
}

/**
 * Generates an employee's work schedule within a specified date range, based on a pattern of working and off days.
 * The start and end dates of the period are inclusive.
 *
 * @typedef {{
 * start: string, // The start date in 'DD-MM-YYYY' format.
 * end: string    // The end date in 'DD-MM-YYYY' format.
 * }} DatePeriod
 *
 * @param {DatePeriod} period - The start and end dates of the period.
 * @param {number} countWorkDays - The number of consecutive working days.
 * @param {number} countOffDays - The number of consecutive days off.
 * @return {Array<string>} - An array of dates in 'DD-MM-YYYY' format representing the work schedule.
 *
 * @example:
 * { start: '01-01-2024', end: '15-01-2024' }, 1, 3 => ['01-01-2024', '05-01-2024', '09-01-2024', '13-01-2024']
 * { start: '01-01-2024', end: '10-01-2024' }, 1, 1 => ['01-01-2024', '03-01-2024', '05-01-2024', '07-01-2024', '09-01-2024']
 */
function getWorkSchedule(period, countWorkDays, countOffDays) {
  const startArr = period.start.split('-');
  const startDate = new Date(`${startArr[1]}-${startArr[0]}-${startArr[2]}`);
  const endArr = period.end.split('-');
  const endDate = new Date(`${endArr[1]}-${endArr[0]}-${endArr[2]}`);
  const arr = [];
  const result = [];
  for (
    let i = startDate.getTime();
    i <= endDate.getTime();
    i += 24 * 60 * 60 * 1000
  ) {
    const day = new Date(i).getDate().toString().padStart(2, '0');
    const month = (new Date(i).getMonth() + 1).toString().padStart(2, '0');
    const year = new Date(i).getFullYear();
    arr.push(`${day}-${month}-${year}`);
  }
  const { length } = arr;

  for (let i = 0; i <= length; i += 1) {
    result.push(arr.splice(0, countWorkDays));
    arr.splice(0, countOffDays);
  }
  return result.flat();
}

/**
 * Determines whether the year in the provided date is a leap year.
 * A leap year is a year divisible by 4, but not by 100, unless it is also divisible by 400.
 *
 * @param {Date} date - The date from which the year will be checked.
 * @return {boolean} - True if the year is a leap year, false otherwise.
 *
 * @example:
 * Date(2024, 2, 1) => true
 * Date(2022, 2, 1) => false
 * Date(2020, 2, 1) => true
 */
function isLeapYear(date) {
  const year = new Date(date).getFullYear();
  let result;
  if (year % 4 === 0) {
    result = true;
    if (year % 100 === 0) {
      result = false;
      if (year % 400 === 0) {
        result = true;
      }
    }
  } else {
    result = false;
  }

  return result;
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
