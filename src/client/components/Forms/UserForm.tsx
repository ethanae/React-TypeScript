import * as React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';

const InnerUserForm = (props: any) => {
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleSubmit,
    isSubmitting,
    handleReset
  } = props;
  return (
    <form onSubmit={handleSubmit}>
    <div className='form-group'>
      <label htmlFor="idNumber">
        ID Number:
      </label>
      <input
        id="idNumber"
        placeholder="Enter your ID Number"
        type="text"
        value={values.idNumber}
        onChange={handleChange}
        className={errors.idNumber && touched.idNumber ? 'border border-danger form-control' : 'form-control'}
      />
      {
        errors.idNumber && touched.idNumber && 
        <div className='text-danger'>
          {errors.idNumber}
        </div>
      }
    </div>
    <div className='form-group'>
          <label htmlFor="firstName" >
            First Name:
          </label>
          <input
            id="firstName"
            placeholder="Enter your first name"
            type="text"
            value={values.firstName}
            onChange={handleChange}
            className={errors.firstName && touched.firstName ? 'border border-danger form-control' : 'form-control'}
          />
          {
            errors.firstName && touched.firstName && 
            <div className='text-danger'>
              {errors.firstName}
            </div>
          }
        </div>

    <div className='form-group'>
          <label htmlFor="lastName" className='f6 b db mb2' >
            Last Name:
          </label>
          <input
            id="lastName"
            placeholder="Enter your last name"
            type="text"
            value={values.lastName}
            onChange={handleChange}
            className={errors.lastName && touched.lastName ? 'border border-danger form-control' : 'form-control'}
          />
          {
            errors.lastName && touched.lastName && 
            <div className='text-danger'>
              {errors.lastName}
            </div>
          }
        </div>

    <div className='form-group'>
          <label htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            placeholder="Enter your email"
            type="text"
            value={values.email}
            onChange={handleChange}
            className={errors.email && touched.email ? 'border border-danger form-control' : 'form-control'}
          />
          {
            errors.email && touched.email && 
            <div className='text-danger'>
              {errors.email}
            </div>
          }
        </div>

    <div className='form-group'>
        <label htmlFor="tel">
          Tel:
        </label>
        <input
          id="tel"
          placeholder="Enter your contact number"
          type="text"
          value={values.tel}
          onChange={handleChange}
          className={errors.tel && touched.tel ? 'border border-danger form-control' : 'form-control'}
        />
        {
          errors.tel && touched.tel && 
          <div className='text-danger'>
            {errors.tel}
          </div>
        }
      </div>
      <div className='form-group'>
      <label htmlFor="address">
        Address:
      </label>
      <textarea
        id="address"
        placeholder="Enter your address"
        value={values.address}
        onChange={handleChange}
        className={errors.address && touched.address ? 'border border-danger form-control' : 'form-control'}
      />
      {
        errors.address && touched.address && 
        <div className=''>
          {errors.address}
        </div>
      }
      </div>

      <div>
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={handleReset}
          disabled={!dirty || isSubmitting}>
          Clear
        </button>

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}> Create User </button>
      </div>
    </form>
  );
};

const Formik = withFormik({
  mapPropsToValues: () => ({ 
    idNumber: '', 
    firstName: '', 
    lastName: '',
    email: '',
    tel: '',
    address: '',
  }),
  validationSchema: Yup.object().shape({
    idNumber: Yup.string().required('ID number required').matches(/[0-9]{13}$/, 'ID number must be 13 numeric characters'),
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Surname required'),
    email: Yup.string().email('Invalid email').required('Email required'),
    tel: Yup.string(),
    address: Yup.string(),
  }),
  handleSubmit: (values, { resetForm, setSubmitting }) => {
    toast.info('Creating User... :)');
    fetch('/api/user/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    })
    .then(res => {
      if(res.ok) {
        toast.success('User Created!');
        resetForm();
      }
      else 
        toast.error('We had trouble creating that user. Please try again!');
      setSubmitting(false);
    })
    .catch(_ => toast.error('Oops something went wrong!'));
  },
  displayName: 'Create User', 
})(InnerUserForm);

export const UserForm = () => {
  return (
    <div>
     <Formik />
    </div>
  );
}