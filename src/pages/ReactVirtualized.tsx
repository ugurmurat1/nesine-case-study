import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { AutoSizer, List, ListRowProps } from 'react-virtualized';
import ViewBox from '../components/ViewBox';
import Table from '../components/Table';
import '../assets/Pages.css';

const ReactVirtualized: React.FC = () => {
  const { state, fetchData, handleCellClick, isCellClicked, resetState } = useContext(AppContext);

  useEffect(() => {
    fetchData();

    return () => {
      resetState();
    };

  }, [fetchData, resetState]);

  const rowRenderer = ({ key, index, style }: ListRowProps) => {
    const item = state.data?.[index];

    if (!item) return <div key={key} style={style}>Loading...</div>;

    return (
      <div key={key} style={style}>
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
          <AutoSizer>
            {({ height, width }: { height: number, width: number }) => (
              <List
                width={width}
                height={height}
                rowCount={state.data?.length || 0}
                rowHeight={100}
                rowRenderer={rowRenderer}
              />
            )}
          </AutoSizer>
        )}
      </div>
      <ViewBox />
    </>
  );
};

export default ReactVirtualized;
