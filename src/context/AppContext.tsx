import React, { createContext, useState, ReactNode, useCallback } from 'react';
import axios from 'axios';

interface AppState {
  data?: any[];
  loading?: boolean;
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
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  fetchData: () => void;
  handleCellClick: (rowIndex: number, cellIndex: number, item: any, value: number) => void;
  isCellClicked: (rowIndex: number, cellIndex: number) => boolean;
  resetState: () => void;
}

const defaultState: AppState = {
  data: [],
  loading: false,
  clickedCells: []
};

const AppContextDefaultValues: AppContextType = {
  state: defaultState,
  setState: () => {},
  fetchData: () => {},
  handleCellClick: () => {},
  isCellClicked: () => false,
  resetState: () => {}
};

export const AppContext = createContext<AppContextType>(AppContextDefaultValues);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(defaultState);

  // Get Bets Data
  const fetchData = useCallback(async () => {
    setState(prevState => ({ ...prevState, loading: true }));
    try {
      const response = await axios.get('https://nesine-case-study.onrender.com/bets');
      setState(prevState => ({ ...prevState, data: response.data, loading: false }));
    } catch (error) {
      console.error('Error fetching data', error);
      setState(prevState => ({ ...prevState, loading: false }));
    }
  }, []);

  // Cell Click Method
  const handleCellClick = (rowIndex: number, cellIndex: number, item: any, value: number) => {
    const cell = { rowIndex, cellIndex, item, value };

    const cellExists = state.clickedCells.some(
      (clickedCell) => clickedCell.rowIndex === rowIndex && clickedCell.cellIndex === cellIndex
    );

    if (cellExists) {
      setState(prevState => ({
        ...prevState,
        clickedCells: prevState.clickedCells.filter((clickedCell) => clickedCell.rowIndex !== rowIndex || clickedCell.cellIndex !== cellIndex)
      }));
    } else {
      const otherCells = state.clickedCells.filter((clickedCell) => clickedCell.rowIndex !== rowIndex);
      setState(prevState => ({
        ...prevState,
        clickedCells: [...otherCells, cell]
      }));
    }
  };

  // Is Clicked Control
  const isCellClicked = (rowIndex: number, cellIndex: number) => {
    return state.clickedCells.some(
      (clickedCell) => clickedCell.rowIndex === rowIndex && clickedCell.cellIndex === cellIndex
    );
  };

  // Reset State 
  const resetState = useCallback(() => {
    setState(defaultState);
  }, []);

  return (
    <AppContext.Provider value={{ state, setState, fetchData, handleCellClick, isCellClicked, resetState }}>
      {children}
    </AppContext.Provider>
  );
};
