import dayjs from 'dayjs';

function getHumanizeDate(date) {
  return dayjs(date).format('DD/MM/YY HH:mm');
}

function getDateWithoutTime(date) {
  return dayjs(date).format('YYYY-MM-DD');
}

function getDayFromDate(date) {
  return dayjs(date).format('MMM DD');
}

function getTimeFromDate(date) {
  return dayjs(date).format('HH:mm');
}

function getDateWithoutSeconds(date) {
  return dayjs(date).format('YYYY-MM-DDThh:mm');
}

function getNowDate() {
  return dayjs();
}

export { getHumanizeDate, getNowDate, getDateWithoutTime, getDayFromDate,
  getTimeFromDate, getDateWithoutSeconds};
