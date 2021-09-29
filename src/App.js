import "./App.css";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";

function App() {
  const [tableData, setTableData] = useState("");
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
            onRowAdd: (data) =>
              new Promise((resolve, reject) => {
                console.log(data);
                setTableData([...tableData, data]);
                setTimeout(resolve(), 0);
              }),
         
            onRowUpdate:(newData,oldData)=>new Promise((resolve,reject)=>{
              const updatedData = [...tableData]
              updatedData[oldData.tableData.id]=newData
              setTableData(updatedData)
              setTimeout(resolve(), 0);
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
