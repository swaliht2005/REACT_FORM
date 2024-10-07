import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; 

function Form() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  const handleregistration = (val) => {
    const existingData = JSON.parse(localStorage.getItem('formData')) || [];
    const isDuplicate = existingData.some((data) => {
      return data.firstname === val.firstname || data.lastname === val.lastname || data.email === val.email || data.phone === val.phone;
    });

    // if (isDuplicate) {
    //   alert('Firstname, lastname, email or phone already exists!');
    //   return;
    // }

    const updatedData = [...existingData, val];
    localStorage.setItem('formData', JSON.stringify(updatedData)); 
    console.log(updatedData);
    navigate('/table');
  };
  

  return (
    <div className='container'>
      <div className="containerfirst">
        <h2>Form In React</h2><br /><br />
        <form onSubmit={handleSubmit(handleregistration)}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            placeholder='Enter First Name'
            name='firstname'
            {...register('firstname', { required: true, minLength: 6 })}
          
          />
          {errors.firstname && <p>First name is required (6 characters)</p>}<br /><br />

          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            placeholder='Enter Last Name'
            name='lastname'
            {...register('lastname', { required: true })}
          />
          {errors.lastname && <p>Last name is required</p>}<br /><br />

          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder='Enter Email'
            name='email'
            {...register('email', {
              required: true,
              pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            })}
          />
          {errors.email && <p>Valid email is required</p>}<br /><br />

          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            placeholder='Enter phone #'
            name='contact'
            {...register('contact', { required: true, minLength: 10 })}
          />
          {errors.contact && <p>Contact is required (minimum 10 characters)</p>}<br /><br />

          <label htmlFor="gender">Gender</label><br />
          <input type="radio" name='gender' value="male" {...register('gender', { required: true })} /> Male
          <input type="radio" name='gender' value="female" {...register('gender', { required: true })} /> Female
          {errors.gender && <p>Gender is required</p>}<br /><br />

          <label htmlFor="subject">Subject</label>
          <select name="subject" id="subject" {...register('subject', { required: true })}>
            <option value="math">Math</option>
            <option value="physics">Physics</option>
            <option value="english">English</option>
          </select>
          {errors.subject && <p>Subject is required</p>}<br /><br /><br />

          <div className="formbutton">
            <button class="button" type="button" onClick={() => reset()}>
              <span class="text_button">Reset</span>
            </button>
            <button class="button" type="submit">
              <span class="text_button">Submit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
