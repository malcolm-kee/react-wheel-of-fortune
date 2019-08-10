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
      <div style={{ width: 300 }}>
        <WheelOfFortune
          // items={['Malcolm', 'Wendy', 'Pikachu', 'X-Men', 'Toby'].filter(
          //   x => !selectedBefore.includes(x)
          // )}
          items={['Malcolm', 'Wendy', 'Toby']}
          onSelect={setSelected}
        />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
