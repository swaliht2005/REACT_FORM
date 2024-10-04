import React, { useEffect, useState } from 'react'
import { json } from 'react-router-dom';

function Table() {
  const [savedData, setSaveData]=useState ([]);
  const [filterData, setFilterData]=useState ([]);
  const [serchTherm, setSerchTherm]=useState ('');
  const [sortData, setSortData]=useState({key:'username', direction:'ascending'})

useEffect(()=>{
  const Data = JSON.parse(localStorage.getItem('formData') || '[]');
  setSaveData(Data);
  setFilterData(Data);
},[]);

const handleSearch = (e) => {
  setSerchTherm(e.target.value);
  const filtered = savedData.filter(
    (item) =>
      item.username.toLowerCase().includes(e.target.value.toLowerCase()) ||
      item.email.toLowerCase().includes(e.target.value.toLowerCase())
  );
  setFilterData(filtered);
};
const handlesort =(key)=>{
let direction ='ascending';
if (sortData.key === key && sortData.direction === 'ascending'){
  direction = 'decsending';
}
setSortData({key , direction});
  const setSortData = [...filterData].sort((a,b)=>{
    if (a[ key ] < b[key]){
      return direction === 'ascending'?-1:1;
    }
    if(a[ key ] < b[key]){
      return direction === 'ascending'?1:-1;
    }
    return 0;
  })
  setFilterData(sortData);
};

  return (
    <div className='table'>
     <div className="tablefirst">
      <input
        type="text"
        value={serchTherm}
        onChange={handleSearch}
        placeholder="Search by firstname or email"  
      />

      <table id='table'>
        <thead >
          <tr>
             <th onClick={()=>handlesort('firstname')}>
             First Name{sortData.key==='firstname'&&(sortData.direction === 'ascending'? '↑' : '↓')}
             </th>
             <th onClick={()=>handlesort('lasstname')}>
             Last Name{sortData.key==='lastname'&&(sortData.direction === 'ascending'? '↑' : '↓')}
             </th>
             
             <th onClick={()=>handlesort('email')}>
             Email{sortData.key==='email'&&(sortData.direction === 'ascending'? '↑' : '↓')}
             </th>
             <th onClick={()=>handlesort('gender')}>
             Gender{}
             </th>
             <th onClick={()=>handlesort('subject')}>
             Subject{}
             </th>
          </tr>
        </thead>
        <tbody>
        {filterData.length > 0 ? (
            filterData.map((data, index) => (
              <tr key={index}>
                <td >{data.firstname}</td>
                <td >{data.lastname}</td>
                <td >{data.email}</td>
                <td >{data.gender}</td>
                <td >{data.subject}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Table


