import { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./PlayersList.css";

const columns = [
  { field: "points", headerName: "נקודות", headerAlign: 'right', type: "number", width: 120, filterable: false, align: 'right' },
  { field: "price", headerName: "מחיר", headerAlign: 'right', type: "number", width: 120, filterable: false, align: 'right' },
  { field: "playerName", headerName: "שם שחקן", headerAlign: 'right', width: 275, filterable: false, align: 'right' }
];

const rows = [
  { id: 1, points: 64, price: 10, playerName: "ערן זהבי", position: 'FW' },
  { id: 2, points: 72, price: 10, playerName: "עומר אצילי", position: 'MF' },
  { id: 3, points: 34, price: 15, playerName: "כריסטיאנו רונאלדו", position: 'MF' },
  { id: 4, points: 15, price: 15, playerName: "ליונל מסי", position: 'MF' },
  { id: 5, points: 66, price: 15, playerName: "ארלינג האלנד", position: 'FW' },
  { id: 6, points: 12, price: 6, playerName: "דניאל פרץ", position: 'GK' },
  { id: 7, points: 44, price: 14, playerName: "קארים בנזמה", position: 'FW' },
  { id: 8, points: -18, price: 13, playerName: "בן ביטון", position: 'FW' },
  { id: 9, points: 25, price: 14, playerName: "ניימאר", position: 'FW' },
];

function PlayersList() {
  const [selectionModel, setSelectionModel] = useState([]);

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection.selectionModel);
  };

  return (
    <div>
      <DataGrid style={{position:'fixed', top:'30%', right:'67.5%',
        width:'30%', height: '67%', backgroundColor: '#FFFFFF'}}
        checkboxSelection
        disableSelectionOnClick
        rows={rows}
        columns={columns}
        onSelectionModelChange={handleSelectionModelChange}
        selectionModel={selectionModel}
      />
    </div>
  );
}

export default PlayersList;