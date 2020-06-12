export function toTimeAgo(timestamp){
    const timeAgo = Number(new Date()) - timestamp;
    const minute = 60000;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;
    switch (true) {
      case timeAgo < minute:
        const seconds = Math.round(timeAgo / 1000);
        return `${seconds} ${seconds > 1 ? 'seconds' : 'second'} ago`
      case timeAgo < hour:
        const minutes = Math.round(timeAgo / minute);
        return  `${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ago`
      case timeAgo < day:
        const hours = Math.round(timeAgo / hour);
        return `${hours} ${hours > 1 ? 'hours' : 'hour'} ago`
      case timeAgo < month:
        const days = Math.round(timeAgo / day);
        return `${days} ${days > 1 ? 'days' : 'day'} ago`
      case timeAgo < year:
        const months = Math.round(timeAgo / month);
        return `${months} ${months > 1 ? 'months' : 'month'} ago`
      case timeAgo > year:
        const years = Math.round(timeAgo / year);
        return `${years} ${years > 1 ? 'years' : 'year'} ago`
      default:
        return "";
    }
}