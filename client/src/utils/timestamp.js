const SECOND = 1e3,
  MINUTE = 6e4,
  HOUR = 36e5,
  DAY = 864e5; // miliseconds

export default (now, created) => {
  if (typeof created === 'string') created = new Date(created);
  const diff = now - created;
  let amount;
  if (diff < HOUR) {
    if (diff < MINUTE) {
      amount = Math.floor(diff / SECOND);
      return `${amount} ${amount > 1 ? 'seconds' : 'second'} ago`;
    } else {
      amount = Math.floor(diff / MINUTE);
      return `${amount} ${amount > 1 ? 'minutes' : 'minute'} ago`;
    }
  } else {
    if (diff < DAY) {
      amount = Math.floor(diff / HOUR);
      return `${amount} ${amount > 1 ? 'hours' : 'hour'} ago`;
    } else {
      amount = Math.floor(diff / DAY);
      return `${amount} ${amount > 1 ? 'days' : 'day'} ago`;
    }
  }
};
