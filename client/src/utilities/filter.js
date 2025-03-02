const filterAISMessages = (messages, term, properties = ['name', 'MMSI']) => {
  if (properties.length === 0 || term === '') return messages;
  return messages.filter((message) => {
    const propertyValues = properties.reduce(
      (result, property) =>
        (result += message[property] ? message[property] : ''),
      ''
    );
    return propertyValues.toLowerCase().includes(term.toLowerCase());
  });
};

export { filterAISMessages };
