const sortAISReportsByPinned = (reports) => {
  return [
    ...reports.filter(({ isPinned }) => isPinned),
    ...reports.filter(({ isPinned }) => !isPinned),
  ];
};

export { sortAISReportsByPinned };
