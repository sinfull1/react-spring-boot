import React, { useState } from 'react';
import { render } from "react-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { columnDefs, defaultColDef } from '../helpers/columnDefHelper';
import "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Redirect } from 'react-router-dom';
import "./events.css";
import Dropdown from 'react-dropdown';

let id = Math.random().toString(36).substr(2, 9);



let sseEvents = new EventSource("https://connect-server-new.cfapps.io//getHttp?subsId=" + id);
sseEvents.onopen = event => console.log('open', event);
sseEvents.onerror = event => {
  console.log("Server side shut");
  sseEvents.close();
  sseEvents = new EventSource("https://connect-server-new.cfapps.io/getHttp?subsId=" + id);
}
let savedFilter = [];
let savedSelectedRows = [];
let options = ['NoFilter'];
let choices = [{ id: 0, value: "NoFilter" }];
let value = choices[0];
const defaultOption = options[0];

let optionsSel = ['NoSelection'];
let choicesSel = [{ id: 0, value: "NoSelection" }];
let valueSel = choicesSel[0];
const defaultOptionSel = optionsSel[0];


export default function Events(props) {

  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);


  function getRowNodeId(data) {
    return data.id;
  };

  sseEvents.onmessage = event => {
    const update = event.data;
    setRowData(JSON.parse(update));
  };

  function addRowData(newData) {
    fetch('https://connect-server-new.cfapps.io/event?subsId=' + id + "&event=sample");
  };

  function removeRowData() {
    let selectedRow = gridApi.getSelectedRows();
    let newRowData = rowData.filter(row => {
      return !selectedRow.includes(row);
    });
    setRowData(newRowData);

  };



  function updateOddRowData() {
    let newRowData = rowData.map((row, index) => {
      if (index % 2 !== 0) {
        return { ...row, title: "NewTitle", body: "NewBody" };
      }
      return row;
    });
    setRowData(newRowData);
  };

  function saveFilters() {
    let filterCopy = JSON.parse(JSON.stringify(gridApi.getFilterModel()));
    console.log(Object.keys(filterCopy).length);
    if (Object.keys(filterCopy).length !== 0) {
      savedFilter.push(filterCopy);
      options.push("filter" + parseInt(options.length));
      choices.push({
        id: "filter" + parseInt(options.length) - 1,
        value: filterCopy
      });
    }
    else {
      alert("No filter created");
    }
  }

  function saveSelection() {
    let rows = JSON.parse(JSON.stringify(gridApi.getSelectedRows()));
    if (rows.length !== 0) {
      savedSelectedRows.push(rows);
      optionsSel.push("selection" + parseInt(optionsSel.length));
      choicesSel.push({
        id: "selection" + parseInt(optionsSel.length) - 1,
        value: rows
      });
    }
    else {
      alert("No selection created");
    }
  }

  async function applyFilter(data) {
    choices.forEach(function (value, key) {
      if (data.label == options[key]) {
        gridApi.setFilterModel(value.value);
        let x = document.getElementsByClassName("Dropdown-placeholder placeClass is-selected").item(0);
        x.innerHTML = data.label;
      }
    })
  }

  async function applySelection(data) {
    gridApi.deselectAll()
    choicesSel.forEach(function (value, key) {
      if (data.label == optionsSel[key]) {
        gridApi.forEachNodeAfterFilterAndSort(function (rowNode, index) {
          {
            console.log(data,value);
            if(value.value == "NoSelection")
            {
              return;
            }
            if (Object.keys(value.value).length !== 0)
                value.value.map(row => {
                if (row.id == rowNode.id) {
                  
                  rowNode.setSelected(true);
                }
              });
          }
        }
       );
      }
    });
  }

  async function removeAllFilters() {
    gridApi.setFilterModel({});
    value = choices[0];
    let x = document.getElementsByClassName("Dropdown-placeholder placeClass is-selected").item(0);
    x.innerHTML = "NoFilter";
  }

  async function removeAllSelection() {
    gridApi.deselectAll();
    let x = document.getElementsByClassName("Dropdown-placeholder placeClass2 is-selected").item(0);
    x.innerHTML = "NoSelection";
  }

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onQuickFilterChanged = () => {
    gridApi.setQuickFilter(document.getElementById('quickFilter').value);
  };

  return (
    <div style={{ width: "1000px", height: "600px" }}>
      <button className="button" onClick={() => addRowData()}>Append row</button>
      <button className="button" onClick={() => removeRowData()}>
        Delete selected row
        </button>
      <button className="button" onClick={() => updateOddRowData()}>Update odd rows</button>
 
      <button className="button" onClick={() => saveFilters()}>
        Save Current Filter
        </button>

      <button className="button" onClick={() => saveSelection()}>
        Save Selection
        </button>
        <button className="button" onClick={() => removeAllSelection()}>
        Remove Selection
        </button>


      <Dropdown className='dropdown'
        controlClassName='controlClass'
        placeholderClassName='placeClass'
        onChange={applyFilter}
        options={options}
        value={defaultOption}
        placeholder="Select an option" />

      <Dropdown className='dropdown'
        controlClassName='controlClass'
        placeholderClassName='placeClass2'
        onChange={applySelection}
        options={optionsSel}
        value={defaultOptionSel}
        placeholder="Save selection" />

      <button className="button" onClick={() => removeAllFilters()}>
        Remove all filters
        </button>
      <div className="quickFilterDiv">
        Quick Filter
        <input
          type="text"
          onInput={() => onQuickFilterChanged()}
          id="quickFilter"
          placeholder="filter on all cols.."
        />
      </div>
      <div
        id="myGrid"
        style={{
          height: "100%",
          width: "100%"
        }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          getRowNodeId={getRowNodeId}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={"multiple"}
          onGridReady={onGridReady}
          immutableData={true}
          rowData={rowData}
        />
      </div>

    </div>
  );
}
