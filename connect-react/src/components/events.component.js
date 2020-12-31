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
import ModalComponent from './modal.component';

let id = Math.random().toString(36).substr(2, 9);



let sseEvents = new EventSource("http://localhost:8080/getHttp?subsId=" + id);
sseEvents.onopen = event => console.log('open', event);
sseEvents.onerror = event => {
  console.log("Server side shut");
  sseEvents.close();
  sseEvents = new EventSource("http://localhost:8080/getHttp?subsId=" + id);
}
const savedFilter = [];
const savedSelectedRows = [];
const options = [];
const choices = [];
let value = choices[0];


const optionsSel = [];
const choicesSel = [];
let valueSel = optionsSel[0];
const defaultOptionSel = optionsSel[0];

const optionsPreset = [];
const choicesPreset = [{ id: 0, value: "NoFilter" }];


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
    fetch('http://localhost:8080/event?subsId=' + id + "&event=sample");
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

  function saveFilters(textdata) {
    if (textdata.length != 0 && !options.includes(textdata)) {
      let filterCopy = JSON.parse(JSON.stringify(gridApi.getFilterModel()));
      if (Object.keys(filterCopy).length !== 0) {
        savedFilter.push(filterCopy);
        options.push(textdata);
        choices.push({
          id: textdata,
          value: filterCopy
        });
      }
      else{
        alert("No Filter selected ");
      }
    }
    else {
      alert("Filter creation failed check if name is already used or filter is created in grid");
    }
  }

  function saveSelection(textdata) {
    if (textdata.length != 0 && !options.includes(textdata)) {
    let rows = JSON.parse(JSON.stringify(gridApi.getSelectedRows()));
    if (rows.length !== 0) {
      savedSelectedRows.push(rows);
      optionsSel.push(textdata);
      choicesSel.push({
        id: textdata,
        value: rows
      });
    }
    else{
      alert("Nothing selected");
    }
  }
    else {
      alert("Selection not saved, please select something");
    }
  }

  async function applyFilter(data) {
    choices.forEach(function (value, key) {
      if (data.label == options[key]) {
        gridApi.setFilterModel(value.value);
        let x = document.getElementsByClassName("Dropdown-placeholder placeClass is-selected").item(0);
        if (x != undefined) {
          x.innerHTML = data.label;
        }
      }
    })
  }
  async function applyPresetFilter(data) {
    choices.forEach(function (value, key) {
      if (data.label == options[key]) {
        gridApi.setFilterModel(value.value);
        let x = document.getElementsByClassName("Dropdown-placeholder placeClass3 is-selected").item(0);
        if (x != undefined) {
          x.innerHTML = data.label;
        }
      }
    })
  }



  async function applySelection(data) {
    gridApi.deselectAll()
    choicesSel.forEach(function (value, key) {
      if (data.label == optionsSel[key]) {
        gridApi.forEachNodeAfterFilterAndSort(function (rowNode, index) {
          {
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
    let x = document.getElementsByClassName("Dropdown-placeholder placeClass is-selected").item(0);
    if (x != undefined) {
      x.innerHTML = "Saved Filters";
    }
  }

  async function removeAllSelection() {
    gridApi.deselectAll();
    let x = document.getElementsByClassName("Dropdown-placeholder placeClass2 is-selected").item(0);
    if (x != undefined) {
      x.innerHTML = "Saved Selctions";
    }

  }

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onQuickFilterChanged = () => {
    gridApi.setQuickFilter(document.getElementById('quickFilter').value);
  };


  const externalFilterChanged = (newValue) => {
    //  ageType = newValue;
    //gridApi.onFilterChanged();
  };

  const isExternalFilterPresent = () => {
    return true// ageType !== 'everyone';
  };

  const doesExternalFilterPass = (node) => {
    switch (id) {
      case 'below25':
        return true
      default:
        return true;
    }
  };



  return (
    <div style={{ width: "1000px", height: "600px" }}>
      <button className="button" onClick={() => addRowData()}>Append row</button>
      <button className="button" onClick={() => removeRowData()}>
        Delete rows
        </button>




      <ModalComponent  submitfunc={saveSelection} titleName ="Save Selection" />
      <button className="button" onClick={() => removeAllSelection()}>
        Clear Selection
        </button>

      <button className="button" onClick={() => removeAllFilters()}>
        Remove all filters
        </button>
      <ModalComponent  submitfunc={saveFilters} titleName ="Save Filter" />
      <Dropdown className='dropdown'
        controlClassName='controlClass'
        placeholderClassName='placeClass'
        onChange={applyFilter}
        options={options}

        placeholder="Saved Filters" />

      <Dropdown className='dropdown'
        controlClassName='controlClass'
        placeholderClassName='placeClass2'
        onChange={applySelection}
        options={optionsSel}

        placeholder="Saved Selections" />


      <Dropdown className='dropdown'
        controlClassName='controlClass'
        placeholderClassName='placeClass3'
        onChange={applyPresetFilter}
        options={optionsPreset}
        placeholder="Preset Filters" />



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
