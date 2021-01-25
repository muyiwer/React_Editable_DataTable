import  './index.css'
import { Table,OrderCategory, Props,PageNumbers} from "./table";
import React, { useState, useEffect } from "react";
const MuyiTable: React.FC<Props> =(props)=> {
  const [tableData, setTableData] = useState( props.data);
  const orderCategory = new Array<OrderCategory>();
  const [pageNumbers, setPageNumbers] = useState(new Array<PageNumbers>());
  const [Row, setRow] = useState( tableData.Row);
  orderCategory.push({category: "Newest"})
  orderCategory.push({category: "Oldest"})
  useEffect(() => {
    paginateTable(props.rowSize)
  },[]);
  
  async function paginateTable(numberOfRows: number) {
      if(props.paginate)
      {
        numberOfRows = numberOfRows > 0 ? numberOfRows : 10  
        let row = tableData.Row;
        row =  Row.slice(0,numberOfRows);
        await setRow([]); 
        setRow(row)
        const numberOfPages = Math.round(tableData.Row.length / numberOfRows);
        const pageNos = new Array<PageNumbers>();
        console.log("numberOfPages",numberOfPages)
         for (let index = 0; index < numberOfPages; index++) {
             if(index <= 9){
                await pageNos.push({value:index + 1, active: index == 0 ? true : false, show: true})
             }else if(index === 10){
                await pageNos.push({value:index + 1, active: false, show: false})
             }
        }
        await setPageNumbers([])
        setPageNumbers(pageNos);
      }
  }

  async function  SliceByPageNumber(pageNumber: number) {
      let row = tableData.Row;
      let rowSize = props.rowSize > 0 ? props.rowSize : 10  
      let start = rowSize * (pageNumber - 1);
      let end = start + rowSize
      row =  row.slice(start, end);
      await setRow([]); 
      setRow(row)
     // console.log(pageNumbers)
     // let pageNos = pageNumbers;
     // await pageNos.filter(x=> x.active = false);
    //   let activePageNosIndex = pageNos.findIndex(e=> e.active === true);
    //   let pageNosIndex = pageNos.findIndex(e=> e.value === pageNumber);
    //   pageNos[activePageNosIndex].active = false;
    //   pageNos[pageNosIndex].active = true;
     await StructurePageNumbers(pageNumber)
     
  }

  async function OrderByColumnName(e: React.ChangeEvent<HTMLSelectElement>)
   {
       const category = e.target.options[e.target.options.selectedIndex].id;
       const value = e.target.value;
       const columnNumber: number = tableData.Column.findIndex(e=> e.name === value);
       if(category === "Newest")
       {
       await Row.sort(function(a, b) {
            var nameA = a[columnNumber]
            var nameB = b[columnNumber]
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0; 
            });
       }else
       {
       await Row.sort(function(a, b) {
            var nameA = a[columnNumber] 
            var nameB = b[columnNumber] 
            if (nameB < nameA) {
              return -1;
            }
            if ( nameB > nameA ) {
              return 1;
            }
            return 0; 
          });
       }
    await setRow([]); 
      setRow(Row);
   } 

   async function StructurePageNumbers(pageNumber: number) {
    const numberOfPages = Math.round(tableData.Row.length / props.rowSize);
    const pageNumberList = new Array<PageNumbers>();
     for (let index = 0; index < numberOfPages; index++) 
     {
        if(index  === pageNumber || index <= pageNumber + 5 &&  index <= pageNumber - 5)
        {
            if(index === pageNumber) 
            {
                pageNumberList.push({value:pageNumber, active:true, show: true});
            }else
            {
                pageNumberList.push({value:index + 1, active: false, show: true});
            }
        }else if(index === pageNumber + 6)
        {
            pageNumberList.push({value:index + 1, active: false, show: false})
        }
     }
     await setPageNumbers([])
     setPageNumbers(pageNumberList);
     console.log(pageNumberList)
}

    return (
      <div>
       <div className= "portlet box green">
           <div className="portlet-title">
               <div className="caption">
                   {props.tableTitle}
               </div>
           </div>
           <div className="portlet-body util-btn-margin-bottom-5">
            <div style={{float:'right'}}>
             <select onChange={(e) => OrderByColumnName(e)} className="select-css">
            {
                orderCategory.map(y=>
                    <optgroup label={y.category}>
                    {
                          tableData.Column.map(
                            x=>
                        <option id={y.category} value={x.name}>{x.name}</option>
                        )
                    }
                </optgroup>
                    )
            }
            </select>
            </div><br/><br/>
            <div className="table-scrollable" style={{overflow: props.scrollTable ? 'scroll' : '', height:props.height > 0 ? props.height + 'px' : ''}}>
                <table id="muyiTable" style={{width:'100%'}}>
                    <thead>
                     <tr>
                         {
                             tableData.Column.map(x=>
                             <th style={{width: x.width === 0 ? '' : x.width + 'px',textAlign:"left"}}>{x.name}</th> 
                                )
                         }
                     </tr>
                    </thead>
                    <tbody>
                        {
                            Row.map(x=>
                                <tr key={Math.floor(Math.random() * 1000000000)}>
                                   { 
                                   x.map((y, index) => ( 
                                        <td style={{textAlign: tableData.Column[index].align === "right" ?"right" : "left"}}>{y}</td>
                                    ))
                                    }
                                </tr>
                                )
                        }
                    </tbody>
                </table>
                <br/>
                {
                    props.paginate ? 
                    <div style={{float:'right'}}>
                    <button disabled={true} style={{cursor:'pointer', borderRadius:'5px', borderWidth:'thin'}}>Previous page</button>{" "}
                    <div style={{display:'inline'}}>
                        {
                            pageNumbers.map((x, index) => ( 
                                <span>
                                    {
                                        x.show ?      <button onClick={(e) => SliceByPageNumber(x.value)} style={{cursor:'pointer', borderWidth:'thin', backgroundColor:x.active ? '#807c7c' : ''}}>{x.value}</button> :
                                        <span>....</span>
                                    }
                               {" "}</span>
                            ))
                        }
                    </div>
                   
                    <button disabled={false} style={{cursor:'pointer', borderRadius:'5px', borderWidth:'thin'}}>Next page</button>
                </div>  : ""
                }
                
            </div>
           </div>
       </div>
      </div>
    );
  }


  export default MuyiTable