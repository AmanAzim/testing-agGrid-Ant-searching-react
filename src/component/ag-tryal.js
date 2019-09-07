import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

class AgTryal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          field: "name",
          headerName: "Name",
          rowGroup: true,
          hide: true
        },
        {
          headerName: "Game Name",
          field: "game.name",
          width: 267,
          editable: true,
          filter: "agSetColumnFilter",
          tooltipField: "gameName",
          checkboxSelection: function(params) {
            return params.columnApi.getRowGroupColumns().length === 0;
          },
          cellClass: function() {
            return "alphabet";
          }
        },
        {
          headerName: "Country",
          field: "country",
          width: 200,
          editable: true,
          cellEditor: "agRichSelectCellEditor",
          cellEditorParams: {
            values: [
              "Argentina",
              "Brazil",
              "Colombia",
              "France",
              "Germany",
              "Greece",
              "Iceland",
              "Ireland",
              "Italy",
              "Malta",
              "Portugal",
              "Norway",
              "Peru",
              "Spain",
              "Sweden",
              "United Kingdom",
              "Uruguay",
              "Venezuela"
            ]
          },
          floatCell: true,
          filterParams: {
            cellHeight: 20,
            newRowsAction: "keep"
          }
        },
        {
          headerName: "Language",
          field: "language",
          width: 200,
          editable: true,
          filter: "agSetColumnFilter",
          cellEditor: "agSelectCellEditor",
          cellEditorParams: {
            values: ["English", "Spanish", "French", "Portuguese", "(other)"]
          }
        }
      ],
      groupDefaultExpanded: -1,
      autoGroupColumnDef: {
        headerName: "Name",
        field: "name",
        width: 250,
        editable: true,
        cellRendererParams: { checkbox: true }
      },
      defaultColDef: {
        checkboxSelection: function(params) {
          var isGrouping = params.columnApi.getRowGroupColumns().length > 0;
          return params.colIndex === 0 && !isGrouping;
        }
      },
      rowSelection: "multiple"
    };
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div
          id="myGrid"
          style={{
            height: "100%",
            width: "100%"
          }}
          className="ag-theme-fresh"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            groupSelectsChildren={true}
            groupDefaultExpanded={this.state.groupDefaultExpanded}
            autoGroupColumnDef={this.state.autoGroupColumnDef}
            defaultColDef={this.state.defaultColDef}
            rowData={this.state.rowData}
            rowSelection={this.state.rowSelection}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

export default AgTryal;