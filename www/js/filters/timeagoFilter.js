rubyChina.filter('timeago', function() {
  return function(input) {
    var substitute = function (stringOrFunction, number, strings) {
      var string = angular.isFunction(stringOrFunction) ? stringOrFunction(number, dateDifference) : stringOrFunction;
      var value = (strings.numbers && strings.numbers[number]) || number;
      return string.replace(/%d/i, value);
    },
    nowTime = (new Date()).getTime(),
    date = (new Date(input)).getTime(),
    strings= {
      suffixAgo: "前",
      suffixFromNow: "距离现在",
      seconds: "不到一分钟",
      minute: "一分钟",
      minutes: "%d 分钟",
      hour: "一个小时",
      hours: "%d 小时",
      day: "一天",
      days: "%d 天",
      month: "一个月",
      months: "%d 月",
      year: "一年",
      years: "%d 年"
    },
    dateDifference = nowTime - date,
    words,
    seconds = Math.abs(dateDifference) / 1000,
    minutes = seconds / 60,
    hours = minutes / 60,
    days = hours / 24,
    years = days / 365,
    separator = strings.wordSeparator === undefined ?  " " : strings.wordSeparator,

    suffix = strings.suffixAgo;

    words = seconds < 45 && substitute(strings.seconds, Math.round(seconds), strings) ||
    seconds < 90 && substitute(strings.minute, 1, strings) ||
    minutes < 45 && substitute(strings.minutes, Math.round(minutes), strings) ||
    minutes < 90 && substitute(strings.hour, 1, strings) ||
    hours < 24 && substitute(strings.hours, Math.round(hours), strings) ||
    hours < 42 && substitute(strings.day, 1, strings) ||
    days < 30 && substitute(strings.days, Math.round(days), strings) ||
    days < 45 && substitute(strings.month, 1, strings) ||
    days < 365 && substitute(strings.months, Math.round(days / 30), strings) ||
    years < 1.5 && substitute(strings.year, 1, strings) ||
    substitute(strings.years, Math.round(years), strings);

    return [words, suffix].join(separator);
  };
});
