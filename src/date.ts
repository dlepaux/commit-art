export function daysBetweenDates(date1: Date, date2: Date) {
  const timeDiff = Math.abs(date1.getTime() - date2.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function getNextDay(date: Date): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  return newDate;
}
