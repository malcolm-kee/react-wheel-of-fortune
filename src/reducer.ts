import { Reducer } from 'react';

interface WheelState {
  isRunning: boolean;
  selectedItem: string;
}

export const actions = {
  startRun: () => ({ type: 'startRun' }),
  selectItem: (item: string) => ({ type: 'selectItem', payload: item }),
};

export const defaultState: WheelState = {
  isRunning: false,
  selectedItem: '',
};

export const wheelStateReducer: Reducer<WheelState, any> = (state, action) => {
  switch (action.type) {
    case 'startRun':
      return {
        ...state,
        isRunning: true,
      };

    case 'selectItem':
      return {
        ...state,
        isRunning: false,
        selectedItem: action.payload,
      };

    default:
      return state;
  }
};
