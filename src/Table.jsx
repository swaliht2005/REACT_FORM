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
// Handle Edit functionality
const handleEdit = (index) => {
  const updatedData = [...filterData];
  updatedData[index].isEditing = !updatedData[index].isEditing;
  setFilterData(updatedData);
  setSaveData(updatedData);
  localStorage.setItem('formData', JSON.stringify(updatedData)); // Persist changes to localStorage
};
 // Handle Input Change for editing
 const handleInputChange = (index, field, newValue) => {
  const updatedData = [...filterData];
  updatedData[index][field] = newValue;
  setFilterData(updatedData);
};

// Handle Delete functionality
const handleDelete = (index) => {
  const updatedData = filterData.filter((_, i) => i !== index);
  setFilterData(updatedData);
  setSaveData(updatedData);
  localStorage.setItem('formData', JSON.stringify(updatedData)); // Update localStorage
};

  return (
    <div className='table'>
     <div className="tablefirst">
      {/* <input
        type="text"
        value={serchTherm}
        onChange={(e) => handleInputChange(index, 'firstname', e.target.value)}
        placeholder="Search by firstname or email"  
      /> */}

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
             <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {filterData.length > 0 ? (
            filterData.map((data, index) => (
              <tr key={index}>
                <td>
                    {data.isEditing ? (
                      <input
                        type="text"
                        value={data.firstname}
                        onChange={(e) => handleInputChange(index, 'firstname', e.target.value)}
                      />
                    ) : (
                      data.firstname
                    )}
                  </td>
                  <td>
                    {data.isEditing ? (
                      <input
                        type="text"
                        value={data.lastname}
                        onChange={(e) => handleInputChange(index, 'lastname', e.target.value)}
                      />
                    ) : (
                      data.lastname
                    )}
                  </td>
                  <td>
                    {data.isEditing ? (
                      <input
                        type="text"
                        value={data.email}
                        onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                      />
                    ) : (
                      data.email
                    )}
                  </td>
                  <td>
                    {data.isEditing ? (
                      <input
                        type="text"
                        value={data.gender}
                        onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                      />
                    ) : (
                      data.gender
                    )}
                  </td>
                  <td>
                    {data.isEditing ? (
                      <input
                        type="text"
                        value={data.subject}
                        onChange={(e) => handleInputChange(index, 'subject', e.target.value)}
                      />
                    ) : (
                      data.subject
                    )}
                  </td>
                  <td>
                  <div className="tablebutton">
                  <div className="del"  onClick={() => handleEdit(index)}>
                           <div>
                           {data.isEditing ? 'Save' : 'Edit'}
                           </div>     
                        </div>
                    {/* <button onClick={() => handleEdit(index)}>
                      {data.isEditing ? 'Save' : 'Edit'}
                    </button> */}
                    <div className="del" onClick={() => handleDelete(index)}>
                           <div>
                              Delete
                           </div>     
                        </div>
                        </div>
                  </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
              <td colSpan="4">No data available</td>
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


