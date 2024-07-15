import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import '../assets/ViewBox.css'

const ViewBox: React.FC = () => {
  const { state } = useContext(AppContext);

  const total = state.clickedCells.reduce((acc, { value }) => acc * value, 1);

  return (
    <>
      {state.clickedCells.length > 0 && (
        <div className="view">
          {state.clickedCells.map(({ item, value }, index) => (
            <div className="items" key={index}>
              { item.OCG[1].MBS }
              <strong>Kod: </strong> { item.C }
              <strong>Maç: </strong> { item.N }
              <strong>Oran: </strong> { value }
            </div>
          ))}
          <div><strong>{ `Toplam: ${total.toFixed(2)} TL` }</strong></div>
        </div>
      )}
    </>
  );
};

export default ViewBox;
