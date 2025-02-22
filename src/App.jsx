const App = () => {
  const customColours = [
    { background: 'white', text: 'grey-500' },
    { background: 'orange-500', text: 'white' },
    { background: 'blue-500', text: 'white' },
    { background: 'grey-300', text: 'grey-500' },
    { background: 'grey-400', text: 'grey-500' },
    { background: 'grey-500', text: 'white' },
  ];

  return (
    <div className="h-screen flex gap-4 flex-col items-center justify-center">
      <h1 className="text-2xl">AIS Tracker</h1>
      <section>
        <div className="flex gap-2 items-center">
          <h2 className="text-xl me-4">Colours</h2>
          {customColours.map(({ background, text }) => (
            <span
              key={background}
              className={`w-24 h-20 flex items-center justify-center shadow-xl rounded-xl bg-${background} text-${text}`}
            >
              {background}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;
