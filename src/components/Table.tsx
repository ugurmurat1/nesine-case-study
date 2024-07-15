import React from 'react';
import Table from 'react-bootstrap/Table';
import '../assets/Table.css';

interface TableRowProps {
  item: any;
  index: number;
  handleCellClick: (rowIndex: number, cellIndex: number, item: any, value: number) => void;
  isCellClicked: (rowIndex: number, cellIndex: number) => boolean;
}

const TableRow: React.FC<TableRowProps> = ({ item, index, handleCellClick, isCellClicked }) => {
  return (
    <Table className='custom-table' bordered>
      <tbody>
        <tr className="centered-cell table-custom-height first">
          <td className='text-start'>{item.D} {item.DAY} {item.LN}</td>
          <td>Yorumlar</td>
          <td></td>
          <td>1</td>
          <td>x</td>
          <td>2</td>
          <td>{item.OCG[5].OC[25].N}</td>
          <td>{item.OCG[5].OC[26].N}</td>
          <td>H1</td>
          <td>1</td>
          <td>x</td>
          <td>2</td>
          <td>H2</td>
          <td>{item.OCG[2].OC[3].N}</td>
          <td>{item.OCG[2].OC[4].N}</td>
          <td>{item.OCG[2].OC[5].N}</td>
          <td>Var</td>
          <td>Yok</td>
          <td>+99</td>
        </tr>
        <tr className="centered-cell table-custom-height second">
          <td className='text-start'><strong>{item.C}</strong> {item.T} {item.N}</td>
          <td>Yorumlar</td>
          <td>{item.OCG[1].MBS}</td>
          <td onClick={() => handleCellClick(index, 3, item, item.OCG[1].OC[0].O)} className={isCellClicked(index, 3) ? 'clicked' : ''}>{item.OCG[1].OC[0].O}</td>
          <td onClick={() => handleCellClick(index, 4, item, item.OCG[1].OC[1].O)} className={isCellClicked(index, 4) ? 'clicked' : ''}>{item.OCG[1].OC[1].O}</td>
          <td></td>
          <td onClick={() => handleCellClick(index, 6, item, item.OCG[5].OC[25].O)} className={isCellClicked(index, 6) ? 'clicked' : ''}>{item.OCG[5].OC[25].O}</td>
          <td onClick={() => handleCellClick(index, 7, item, item.OCG[5].OC[26].O)} className={isCellClicked(index, 7) ? 'clicked' : ''}>{item.OCG[5].OC[26].O}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>{item.OCG[2].OC[3].O}</td>
          <td>{item.OCG[2].OC[4].O}</td>
          <td>{item.OCG[2].OC[5].O}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </Table>
  );
};

export default TableRow;
