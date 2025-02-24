const formatCOG = (COG) => {
  const unknownValue = '???';
  if (typeof COG !== 'number') return unknownValue;
  return COG.toString().padStart(3, '0');
};

const formatHDG = (HDG) => {
  const unknownValue = '???';
  if (typeof HDG !== 'number') return unknownValue;
  return HDG.toString().padStart(3, '0');
};

const formatPosition = (position) => {
  const unknownValue = ' ???.????';
  if (typeof position !== 'number') return unknownValue;
  const regex = /^(?<sign>-?)(?<beginning>\d+)\.(?<end>\d+)$/;
  const match = position.toFixed(4).toString().match(regex);
  if (!match) return unknownValue;
  const { sign, beginning, end } = match.groups;
  return `${sign}${beginning.padStart(3, '0')}.${end}`.padStart(9, ' ');
};

const formatSOG = (SOG) => {
  return SOG.toString().padStart(3, '0');
};

const formatTimeElapsed = (timestamp) => {};

export { formatCOG, formatHDG, formatPosition, formatSOG, formatTimeElapsed };
