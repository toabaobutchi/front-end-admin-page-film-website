class DateTimeHelper {
  static getDateTime(datetime) {
    var mysqlDate = new Date(datetime)
    return new Date(mysqlDate.getTime() + mysqlDate.getTimezoneOffset() * 60000)
  }
}

export default DateTimeHelper;