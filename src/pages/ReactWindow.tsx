import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { FixedSizeList as List } from 'react-window';
import ViewBox from '../components/ViewBox';
import Table from '../components/Table';
import '../assets/Pages.css';

const ReactWindow: React.FC = () => {
  const { state, fetchData, handleCellClick, isCellClicked, resetState } = useContext(AppContext);
  const [loadedData, setLoadedData] = useState<any[]>([]);

  useEffect(() => {
    fetchData();

    return () => {
      resetState();
    };

  }, [fetchData, resetState]);

  useEffect(() => {
    if (state.data && Array.isArray(state.data)) {
      setLoadedData(state.data);
    }
  }, [state.data]);

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = loadedData[index];

    if (!item) return <div key={index} style={style}>Loading...</div>;

    return (
      <div key={index} style={style}>
        <Table
          item={item}
          index={index}
          handleCellClick={handleCellClick}
          isCellClicked={isCellClicked}
        />
      </div>
    );
  };

  return (
    <>
      <div className="auto-sizer-container">
        {state.loading ? (
          <div className="loading-container">
            <p>Loading...</p>
          </div>
        ) : (
          <List
            height={window.innerHeight - 60}
            itemCount={loadedData.length}
            itemSize={100}
            width={'100%'}
          >
            {Row}
          </List>
        )}
      </div>
      <ViewBox />
    </>
  );
};

export default ReactWindow;
