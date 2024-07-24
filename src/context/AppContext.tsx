import React, { createContext, ReactNode, useCallback, useReducer } from 'react';
import axios from 'axios';

interface AppState {
  data: any[];
  loading: boolean;
  clickedCells: ClickedCell[];
}

interface ClickedCell {
  rowIndex: number;
  cellIndex: number;
  item: any;
  value: number;
}

interface AppContextType {
  state: AppState;
  fetchData: () => void;
  handleCellClick: (rowIndex: number, cellIndex: number, item: any, value: number) => void;
  isCellClicked: (rowIndex: number, cellIndex: number) => boolean;
  resetState: () => void;
  removeItem: (value: string) => void;
}

const defaultState: AppState = {
  data: [],
  loading: false,
  clickedCells: []
};

const AppContextDefaultValues: AppContextType = {
  state: defaultState,
  fetchData: () => {},
  handleCellClick: () => {},
  isCellClicked: () => false,
  resetState: () => {},
  removeItem: () => {}
};

export const AppContext = createContext<AppContextType>(AppContextDefaultValues);

const reducer = (state: AppState, action: any): AppState => {
  switch(action.type) {
    case 'FETCH_DATA_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_DATA_SUCCESS':
      return { ...state, data: action.payload, loading: false }
    case 'FETCH_DATA_FAIL':
      return { ...state, loading: false }
    case 'TOGGLE_CELL_CLICK':
      {
        const { rowIndex, cellIndex, item, value } = action.payload;
        const cellExists = state.clickedCells.some(
          (clickedCell) => clickedCell.rowIndex === rowIndex && clickedCell.cellIndex === cellIndex
        );
        if (cellExists) {
          return {
            ...state,
            clickedCells: state.clickedCells.filter(
              (clickedCell) => clickedCell.rowIndex !== rowIndex || clickedCell.cellIndex !== cellIndex
            )
          };
        } else {
          const otherCells = state.clickedCells.filter((clickedCell) => clickedCell.rowIndex !== rowIndex);
          return { ...state, clickedCells: [...otherCells, { rowIndex, cellIndex, item, value }] };
        }
      }
    case 'RESET_STATE':
      return defaultState
    case 'REMOVE_ITEM':
      return { ...state, clickedCells: state.clickedCells.filter((clickedCell) => clickedCell.item.NID !== action.payload) }
    default:
      return state
  }
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  // Get Bets Data
  const fetchData = useCallback(async () => {
    dispatch({ type: 'FETCH_DATA_REQUEST' })
    try {
      const response = await axios.get('https://nesine-case-study.onrender.com/bets');
      dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response.data })
    } catch (error) {
      console.error('Error fetching data', error);
      dispatch({ type: 'FETCH_DATA_FAIL' })
    }
  }, []);

  // Cell Click Method
  const handleCellClick = useCallback((rowIndex: number, cellIndex: number, item: any, value: number) => {
    dispatch({ type: 'TOGGLE_CELL_CLICK', payload: { rowIndex, cellIndex, item, value } })
  }, []);

  // Is Clicked Control
  const isCellClicked = useCallback((rowIndex: number, cellIndex: number) => {
    return state.clickedCells.some(
      (clickedCell) => clickedCell.rowIndex === rowIndex && clickedCell.cellIndex === cellIndex
    );
  }, [state.clickedCells]);

  // Reset State 
  const resetState = useCallback(() => {
    dispatch({ type: 'RESET_STATE' });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }, []);

  return (
    <AppContext.Provider value={{ state, fetchData, handleCellClick, isCellClicked, resetState, removeItem }}>
      {children}
    </AppContext.Provider>
  );
};
