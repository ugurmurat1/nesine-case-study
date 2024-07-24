import React, { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import '../assets/ViewBox.css'

const ViewBox: React.FC = () => {
  const { state, removeItem } = useContext(AppContext);

  const total = useMemo(() => state.clickedCells.reduce((acc, { value }) => acc * value, 1), [state.clickedCells]);

  return (
    <>
      {state.clickedCells.length > 0 && (
        <div className="view">
          {state.clickedCells.map(({ item, value }, index) => (
            <React.Fragment key={index}>
              <div className="items">
                { item.OCG[1].MBS }
                <strong>Kod: </strong> { item.C }
                <strong>Maç: </strong> { item.N }
                <strong>Oran: </strong> { value }
                <button className='btn btn-danger' onClick={() => removeItem(item.NID)}>X</button>
              </div>
            </ React.Fragment>
          ))}
          <div><strong>{ `Toplam: ${total.toFixed(2)} TL` }</strong></div>
        </div>
      )}
    </>
  );
};

export default ViewBox;
