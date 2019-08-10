import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { WheelOfFortune } from '../.';

const App = () => {
  const [selectedBefore, setSelectedBefore] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<string | undefined>();

  React.useEffect(() => {
    if (selected) {
      setSelectedBefore(before => before.concat(selected));
    }
  }, [selected, setSelectedBefore]);

  return (
    <div>
      {selected}
      <WheelOfFortune
        items={['Malcolm', 'Wendy', 'Pikachu', 'X-Men', 'Toby', 'Kids'].filter(
          x => !selectedBefore.includes(x)
        )}
        onSelect={setSelected}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
