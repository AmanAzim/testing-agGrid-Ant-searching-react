import React,{Component} from 'react';
import SearchFilterDemo from './component/SearchFilter'
import AgTryal from './component/ag-tryal.js';

import FormikExample from './component/Formik/testFormik.js';
import TestField from './component/Formik/testField.js';
import TestFieldArray from './component/Formik/testFieldArray';

import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';//enterprice edition

import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
import { Input } from 'antd';
const { Search } = Input;
const { Header, Content, Sider } = Layout;






class App extends Component{

  state = {
    columnDefs:[
      {headerName: "Make", field: "make", sortable: true, filter: true, rowGroup: true},
      {headerName: "Price", field: "price", sortable: true, filter: true  }
    ],
    autoGroupColumnDef: {
      headerName: "Model",
      field: "model",
      sortable: true,
      cellRenderer:'agGroupCellRenderer',
      cellRendererParams: {
        checkbox: true
      }
    },
   /* rowData:[
      {make: "Toyota", model: "Celica", price: 35000},
      {make: "Ford", model: "Mondeo", price: 32000},
      {make: "Porsche", model: "Boxter", price: 72000}
    ] */
  }

  componentDidMount() {
      fetch('https://api.myjson.com/bins/ly7d1')
      .then(result => result.json())
      .then(rowData => this.setState({rowData}))
   }

   onButtonClick = e => {
      const selectedNodes = this.gridApi.getSelectedNodes()
      const selectedData = selectedNodes.map( node => node.data )//each row of data collect as an array [Toyota, Celica, 3500]
      const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ')
      alert(`Selected nodes: ${selectedDataStringPresentation}`)
    }


  render(){
    /*
         <Layout>
          <div className="ag-theme-balham" style={{ height: '500px', width: '600px' }}>
              <Button type="primary" onClick={this.onButtonClick}>Get selected rows</Button>

              <AgGridReact columnDefs={this.state.columnDefs}
                          rowData={this.state.rowData}
                          rowSelection="multiple"
                          onGridReady={ params => this.gridApi = params.api }
                          groupSelectsChildren={true}
                          autoGroupColumnDef={this.state.autoGroupColumnDef}
                          >
              </AgGridReact>

              <SearchFilterDemo />
              <AgTryal />
          </div>

        </Layout>
    */
    return (
      <>
        <FormikExample />
        <hr/>
        <TestField />
        <hr/>
        <TestFieldArray />
      </>
    );
  }
}

export default App;
