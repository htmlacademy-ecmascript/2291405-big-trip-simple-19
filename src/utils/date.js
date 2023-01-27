import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';


function getHumanizeDate(date) {
  date = date ? date : dayjs().toString();
  return dayjs(date).format('DD/MM/YY HH:mm');
}

function getDateWithoutTime(date) {
  date = date ? date : dayjs().toString();
  return dayjs(date).format('YYYY-MM-DD');
}

function getDayFromDate(date) {
  date = date ? date : dayjs().toString();
  return dayjs(date).format('MMM DD');
}

function getTimeFromDate(date) {
  date = date ? date : dayjs().toString();
  return dayjs(date).format('HH:mm');
}

function getDateWithoutSeconds(date) {
  date = date ? date : dayjs().toString();
  return dayjs(date).format('YYYY-MM-DDThh:mm');
}

function getNowDate() {
  return dayjs();
}

function isPlannedDate(date) {
  dayjs.extend(isSameOrAfter);
  return dayjs(date).isSameOrAfter(dayjs(), 'D');
}

function convertToDb(date) {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  return dayjs(date).tz(dayjs.tz.guess());
}

export { getHumanizeDate, getNowDate, getDateWithoutTime, getDayFromDate,
  getTimeFromDate, getDateWithoutSeconds, isPlannedDate, convertToDb};
