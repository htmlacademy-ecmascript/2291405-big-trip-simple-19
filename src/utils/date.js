import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';


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

export { getHumanizeDate, getNowDate, getDateWithoutTime, getDayFromDate,
  getTimeFromDate, getDateWithoutSeconds, isPlannedDate};
