import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Table from '../components/Table';
import ViewBox from '../components/ViewBox';
import '../assets/Pages.css';

const PureReactCode: React.FC = () => {
  const { state, fetchData, handleCellClick, isCellClicked, resetState } = useContext(AppContext);
  const [loadedData, setLoadedData] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const rowHeight = 100;
  const buffer = 5;

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

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const getVisibleItems = () => {
    if (!containerRef.current) return [];
    const containerHeight = containerRef.current.clientHeight;
    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - buffer);
    const endIndex = Math.min(
      loadedData.length,
      Math.ceil((scrollTop + containerHeight) / rowHeight) + buffer
    );
    return loadedData.slice(startIndex, endIndex).map((item, index) => ({
      item,
      index: startIndex + index,
    }));
  };

  const visibleItems = getVisibleItems();

  return (
    <>
      <div
        className="auto-sizer-container scroll"
        ref={containerRef}
        onScroll={handleScroll}
      >
        {state.loading ? (
          <div className="loading-container">
            <p>Loading...</p>
          </div>
        ) : (
          <div style={{ height: loadedData.length * rowHeight, position: 'relative' }}>
            {visibleItems.map(({ item, index }) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: index * rowHeight,
                  width: '100%',
                }}
              >
                <Table
                  item={item}
                  index={index}
                  handleCellClick={handleCellClick}
                  isCellClicked={isCellClicked}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <ViewBox />
    </>
  );
};

export default PureReactCode;
