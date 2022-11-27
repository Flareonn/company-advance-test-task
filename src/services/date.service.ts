export default class DateService {
  months: Record<string, string> = {
    января: "01",
    февраля: "02",
    марта: "03",
    апреля: "04",
    мая: "05",
    июня: "06",
    июля: "07",
    августа: "08",
    сентября: "09",
    октября: "10",
    ноября: "11",
    декабря: "12",
  };
  formatter = new Intl.DateTimeFormat("ru-Ru", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  convertStringToDate(stringDate: string) {
    if (!stringDate) return new Date();
    const [day, rawMonth, year] = stringDate.split(" ");
    return new Date(`${year}/${this.months[rawMonth]}/${day}`);
  }
  convertDateToString(date: Date) {
    return this.formatter.format(date).replace(/\s*г\./, "");
  }
}
