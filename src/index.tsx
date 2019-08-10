import * as React from 'react';
import { wheelStateReducer, defaultState, actions } from './reducer';
import { pick } from './random';

export interface WheelProps {
  items: string[];
  onSelect: (selectedItem: string | undefined) => void;
}

export const WheelOfFortune: React.FC<WheelProps> = props => {
  const [wheelState, dispatch] = React.useReducer(
    wheelStateReducer,
    defaultState
  );

  React.useEffect(() => {
    let isLatest = true;
    if (wheelState.isRunning) {
      setTimeout(() => {
        if (isLatest) {
          const selected = pick(props.items);
          if (selected) {
            dispatch(actions.selectItem(selected));
          }
          props.onSelect(selected);
        }
      }, 1000);
    }
    return () => {
      isLatest = false;
    };
  }, [wheelState.isRunning, dispatch]);

  return (
    <div>
      Wheel of Fortune {wheelState.isRunning ? 'Running' : ''}
      <button
        onClick={() => dispatch(actions.startRun())}
        disabled={wheelState.isRunning}
      >
        Run
      </button>
      <div className="wheel">
        {props.items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
};
