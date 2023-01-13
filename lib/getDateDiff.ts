export const getDateDiff = (date: string): string => {
  let dateOfDate = new Date(date);
  let diff = new Date().getTime() - dateOfDate.getTime();
  let progress = new Date(diff);

  if (progress.getUTCFullYear() - 1970) {
    date = progress.getUTCFullYear() - 1970 + '年前';
  } else if (progress.getUTCMonth()) {
    date = progress.getUTCMonth() + 'ヶ月前';
  } else if (progress.getUTCDate() - 1) {
    date = progress.getUTCDate() - 1 + '日前';
  } else if (progress.getUTCHours()) {
    date = progress.getUTCHours() + '時間前';
  } else if (progress.getUTCMinutes()) {
    date = progress.getUTCMinutes() + '分前';
  } else {
    date = 'たった今';
  }

  return date
}