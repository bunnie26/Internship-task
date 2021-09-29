import "./App.css";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";

function App() {
  const [tableData, setTableData] = useState([]);
  console.log(tableData);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        setTableData(json);
      });
  }, []);

  const columns = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Username",
      field: "username",
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Phone",
      field: "phone",
    },
    {
      title: "Website",
      field: "website",
    },
  ];
  return (
    <div className="App">
      {tableData ? (
        <MaterialTable
          columns={columns}
          data={tableData}
          title="Internship Task"
          editable={{
            onRowAdd: (data) => fetch("https://jsonplaceholder.typicode.com/users",{
              method:'POST',
              body:JSON.stringify(data), 
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            }).then((response) => response.json())
            .then((json) => {
              setTableData([...tableData, json])
            })
            ,
            onRowUpdate:(newData,oldData)=>fetch(`https://jsonplaceholder.typicode.com/users${oldData.tableData.id}`,{
              method:'PATCH',
              body:JSON.stringify(newData), 
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            }).then((response) => response.json())
            .then((json) => {
              const updatedData = [...tableData];
              updatedData[oldData.tableData.id]=newData;
              setTableData(updatedData);
            })
         ,
            onRowDelete:(selectedRow)=> new Promise((resolve,reject)=>{
              const updatedData = [...tableData]
              updatedData.splice(selectedRow.tableData.id,1)
              setTableData(updatedData)
              setTimeout(resolve(), 0);
            })
          }}
          options={{ actionsColumnIndex: -1, filtering: true ,pageSizeOptions:[2,5,10,15,20],paginationType:"steped",showFirstLastPageButtons:false,addRowPosition:"first"}}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
