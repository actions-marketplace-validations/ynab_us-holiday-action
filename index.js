const core = require("@actions/core");
const usHolidaysHelper = require("us-holidays-helper");
const includedUSHolidayNames = core.getInput("included_holidays").split(",");

const getIncludedUSHolidays = (year) => {
  const allHolidays = usHolidaysHelper.getHolidays(year);
  const includedUSHolidays = includedUSHolidayNames.reduce((usHolidays, currentHoliday) => {
    const currentHolidayTrimmed = currentHoliday.trim();
    usHolidays[currentHolidayTrimmed] = allHolidays[currentHolidayTrimmed];
    return usHolidays;
  }, {});
  return includedUSHolidays;
};

let isTodayAHoliday = false;
if (includedUSHolidayNames.length > 0 && includedUSHolidayNames[0].length > 0) {
  const today = new Date();
  const todaysDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Strip time from date
  isTodayAHoliday = usHolidaysHelper.isInHolidayList(todaysDate, getIncludedUSHolidays);
}

core.setOutput("is-holiday", isTodayAHoliday.toString());
