import * as React from 'react';
import { wheelStateReducer, defaultState, actions } from './reducer';
import { pick } from './random';

const palette = ['#00a0b0', '#6a4a3c', '#cc333f', '#eb6841', '#edc951'];

const pickColor = (index: number) => {
  if (index < palette.length) {
    return palette[index];
  }
  return palette[index % palette.length];
};

export interface WheelProps {
  items: string[];
  onSelect: (selectedItem: string | undefined) => void;
  radius?: number;
}

export const WheelOfFortune: React.FC<WheelProps> = props => {
  const [wheelState, dispatch] = React.useReducer(wheelStateReducer, defaultState);
  const radius = props.radius || 16;

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

  const circumferences = React.useMemo(() => Math.PI * 2 * radius, [radius]);
  const percent = React.useMemo(() => circumferences / props.items.length, [
    props.items.length,
    circumferences,
  ]);

  return (
    <div>
      <button onClick={() => dispatch(actions.startRun())} disabled={wheelState.isRunning}>
        Run
      </button>
      <div className="wheel">
        <svg
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
          style={{
            borderRadius: '50%',
            background: 'yellowgreen',
            overflow: 'hidden',
          }}
        >
          {props.items.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <circle
                  style={{
                    fill: 'transparent',
                    stroke: pickColor(index),
                    strokeWidth: radius * 2,
                    // strokeDashoffset: -(index * percent),
                    strokeDashoffset: -(index * percent) + 0.25 * circumferences,
                    strokeDasharray: `${percent} ${circumferences}`,
                  }}
                  r={radius}
                  cx={radius}
                  cy={radius}
                >
                  {item}
                </circle>
              </React.Fragment>
            );
          })}
          {props.items.map((item, index) => {
            const offset = (Math.PI * 2 * (index + 0.5)) / props.items.length;
            const dist = radius * 0.5;
            const cos = Math.cos(offset) * dist;
            const sin = Math.sin(offset) * dist;

            return (
              <text
                textAnchor="middle"
                x={radius + sin}
                y={radius - cos}
                fill="black"
                key={index}
                style={{
                  fontSize: radius * 0.2,
                }}
              >
                {item}
              </text>
            );
          })}
        </svg>
        {props.items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
};
