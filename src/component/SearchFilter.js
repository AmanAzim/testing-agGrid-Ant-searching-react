import React,{Component} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';//enterprice edition

import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
import { Input } from 'antd';



class SearchFilter extends Component{

  state = {
    columnDefs:[ 
      {headerName: "Make", field: "make", sortable: true, filter: true}, 
      {headerName: "Model", field: "model", sortable: true, filter: true  },
      {headerName: "Price", field: "price", sortable: true, filter: true  }  
    ],
    filteredData:'',
   /* rowData:[
      {make: "Toyota", model: "Celica", price: 35000}, 
      {make: "Ford", model: "Mondeo", price: 32000}, 
      {make: "Porsche", model: "Boxter", price: 72000}
    ] */
  } 
  
  componentDidMount() {
    fetch('https://api.myjson.com/bins/ly7d1')
      .then(result => result.json())
      .then(rowData => this.setState({filteredData:rowData, rowData}))
   }

   onSearch=(value)=>{
      const filteredData= this.state.rowData.filter(data=>{
            return (  data.model.toLowerCase().indexOf(value.toLowerCase())!==-1 || 
                      data.make.toLowerCase().indexOf(value.toLowerCase())!==-1  || 
                      data.price.toString().indexOf(value.toLowerCase())!==-1
                    );
        }); 
      this.setState({filteredData});
   } 

  render(){
    return (
       <Layout>
          <div className="ag-theme-balham" style={{ height: '500px', width: '600px' }}> 
              <Input  placeholder="input search Model/Make/Price" onChange={e => this.onSearch(String(e.target.value))} suffix={<Icon type="search" />} />
              
              <AgGridReact columnDefs={this.state.columnDefs} 
                          rowData={this.state.filteredData} 
                          rowSelection="multiple" 
                          onGridReady={ params => this.gridApi = params.api } >
              </AgGridReact>
          </div>
       </Layout>
    );
  }
}

export default SearchFilter;
