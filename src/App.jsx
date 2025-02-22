import { useAppContext } from './AppContext';

const App = () => {
  const { state, dispatch } = useAppContext();

  const customColours = [
    { colour: 'white', background: 'bg-white', text: 'text-grey-500' },
    { colour: 'orange-500', background: 'bg-orange-500', text: 'text-white' },
    { colour: 'blue-500', background: 'bg-blue-500', text: 'text-white' },
    { colour: 'grey-300', background: 'bg-grey-300', text: 'text-grey-500' },
    { colour: 'grey-400', background: 'bg-grey-400', text: 'text-grey-500' },
    { colour: 'grey-500', background: 'bg-grey-500', text: 'text-white' },
  ];

  return (
    <div className="h-screen flex gap-4 flex-col items-center justify-center">
      <h1 className="text-2xl">AIS Tracker</h1>
      <div className="flex gap-2 items-center">
        <h2 className="text-xl me-4">Colours</h2>
        {customColours.map(({ colour, background, text }) => (
          <span
            key={colour}
            className={`w-24 h-20 flex items-center justify-center shadow-xl rounded-xl ${background} ${text}`}
          >
            {colour}
          </span>
        ))}
      </div>
      <div>
        <button
          className={`px-4 py-2 rounded-xl shadow-xl text-white cursor-pointer ${
            state.test ? 'bg-blue-500' : 'bg-orange-500'
          }`}
          onClick={() => dispatch({ type: 'test' })}
        >
          {state.test ? 'on' : 'off'}
        </button>
      </div>
    </div>
  );
};

export default App;
