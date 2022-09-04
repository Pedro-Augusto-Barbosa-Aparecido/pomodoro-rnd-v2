interface FormatDate {
  time: number;
}

export function formatDate ({ time }: FormatDate) {
  const hour = String(Math.floor(time / 60)).padStart(2, '0');
  const minute = String(time % 60).padStart(2, '0');

  return `${hour}:${minute}`;

}