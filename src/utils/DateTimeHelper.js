class DateTimeHelper {
  static MySQLtoJSDate(datetime) {
    var mysqlDate = new Date(datetime)
    return new Date(mysqlDate.getTime() + mysqlDate.getTimezoneOffset() * 60000)
  }

  // viết hàm lấy thời gian trong ngày
  static getAfterTime(startDateTime, timeInMinute) {
    const miliseconds = timeInMinute * 60 * 1000
    const result = new Date(startDateTime.getTime() + miliseconds)
    return {
      date: result,
      getString() {
        return result.toTimeString().slice(0, 5)
      }
    }
  }

  static getExpectedShowTimes(date = new Date(), time = 60, initTime = 7) {
    date = new Date(date.setHours(initTime))
    date.setMinutes(0)

    let current = { date }

    // giá trị khởi tạo
    let sets = [
      {
        ...current,
        getString() {
          return `${initTime.toString().padStart(2, '0')}:00`
        }
      }
    ]

    while (current.date.getHours() < 23) {
      // vãn còn trong ngày
      current = DateTimeHelper.getAfterTime(current.date, time)
      if (current.date.getHours() >= 23 || current.date.getHours() < initTime) {
        break;
      }
      sets.push(current)
    }
    return sets
  }

  static isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
  }

  static JSDateToMySQLDate(date) {
    return date.toLocaleString('sv-SE') // YYYY-MM-DD HH:MM:SS
  }
}

export default DateTimeHelper
