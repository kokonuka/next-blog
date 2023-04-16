export const getDateDiff = (date: string) => {
  const postTimezone = '+09:00';
  const postTimestamp = Date.parse(date + postTimezone);
  const currentTimestamp = Date.now();
  const progress = new Date(currentTimestamp - postTimestamp);

  let dateDiff: string;
  if (progress.getUTCFullYear() - 1970) {
    dateDiff = progress.getUTCFullYear() - 1970 + '年前';
  } else if (progress.getUTCMonth()) {
    dateDiff = progress.getUTCMonth() + 'ヶ月前';
  } else if (progress.getUTCDate() - 1) {
    dateDiff = progress.getUTCDate() - 1 + '日前';
  } else if (progress.getUTCHours()) {
    dateDiff = progress.getUTCHours() + '時間前';
  } else if (progress.getUTCMinutes()) {
    dateDiff = progress.getUTCMinutes() + '分前';
  } else {
    dateDiff = 'たった今';
  }

  return dateDiff;
}