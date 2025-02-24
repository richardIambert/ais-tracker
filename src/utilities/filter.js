const filterAISReports = (reports, term, properties = ['name', 'MMSI']) => {
  if (properties.length === 0 || term === '') return reports;
  return reports.filter((report) => {
    const propertyValues = properties.reduce(
      (result, property) => (result += report[property] ? report[property] : ''),
      ''
    );
    return propertyValues.toLowerCase().includes(term.toLowerCase());
  });
};

export { filterAISReports };
