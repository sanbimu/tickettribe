import { EventDate } from '~/graphql/schema';

export function generateDateFilter(date: EventDate) {
  const currentDate = new Date();
  const tomorrow = new Date(currentDate);
  tomorrow.setDate(currentDate.getDate() + 1);

  const getFilter = (fromDate: Date, toDate: Date) => {
    return {
      fromDate: { $lte: toDate.toISOString().slice(0, 10) },
      toDate: { $gte: fromDate.toISOString().slice(0, 10) },
    };
  };

  switch (date) {
    case EventDate.TODAY:
      return getFilter(currentDate, tomorrow);
    case EventDate.TOMORROW:
      const dayAfterTomorrow = new Date(currentDate);
      dayAfterTomorrow.setDate(currentDate.getDate() + 2);

      return getFilter(tomorrow, dayAfterTomorrow);
    case EventDate.THIS_WEEKEND:
      const thisSaturday = new Date();
      thisSaturday.setDate(currentDate.getDate() + (6 - currentDate.getDay()));

      const thisSunday = new Date(thisSaturday);
      thisSunday.setDate(thisSaturday.getDate() + 2);

      return getFilter(thisSaturday, thisSunday);
    case EventDate.NEXT_WEEK:
      const nextMonday = new Date();
      nextMonday.setDate(currentDate.getDate() + (7 - currentDate.getDay()) + 1);

      const nextSunday = new Date(nextMonday);
      nextSunday.setDate(nextMonday.getDate() + 6);

      return getFilter(nextMonday, nextSunday);
    default:
      throw new Error('Invalid EventDate value');
  }
}
