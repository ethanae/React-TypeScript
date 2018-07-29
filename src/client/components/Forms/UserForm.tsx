import * as React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";

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
    <div className='fl w-100 pa2'>
      <label htmlFor="idNumber" className='f6 b db mb2' style={{display: 'block'}}>
        ID Number:
      </label>
      <input
        id="idNumber"
        placeholder="Enter your ID Number"
        type="text"
        value={values.idNumber}
        onChange={handleChange}
        className={errors.idNumber && touched.idNumber ? 'form-input-error form-input' : 'form-input'}
      />
      {
        errors.idNumber && touched.idNumber && 
        <div className='form-error-text'>
          {errors.idNumber}
        </div>
      }
    </div>
        <div className='fl w-100 pa2'>
          <label htmlFor="firstName" className='f6 b db mb2' style={{display: 'block'}}>
            First Name:
          </label>
          <input
            id="firstName"
            placeholder="Enter your first name"
            type="text"
            value={values.firstName}
            onChange={handleChange}
            className={errors.firstName && touched.firstName ? 'form-input-error form-input' : 'form-input'}
          />
          {
            errors.firstName && touched.firstName && 
            <div className='form-error-text'>
              {errors.firstName}
            </div>
          }
        </div>

        <div className='fl w-100 pa2'>
          <label htmlFor="lastName" className='f6 b db mb2' style={{display: 'block'}}>
            Last Name:
          </label>
          <input
            id="lastName"
            placeholder="Enter your last name"
            type="text"
            value={values.lastName}
            onChange={handleChange}
            className={errors.lastName && touched.lastName ? 'form-input-error form-input' : 'form-input'}
          />
          {
            errors.lastName && touched.lastName && 
            <div className='form-error-text'>
              {errors.lastName}
            </div>
          }
        </div>

        <div className='fl w-100 pa2'>
          <label htmlFor="email" className='f6 b db mb2' style={{display: 'block'}}>
            Email:
          </label>
          <input
            id="email"
            placeholder="Enter your email"
            type="text"
            value={values.email}
            onChange={handleChange}
            className={errors.email && touched.email ? 'form-input-error form-input' : 'form-input'}
          />
          {
            errors.email && touched.email && 
            <div className='form-error-text'>
              {errors.email}
            </div>
          }
        </div>

      <div className='fl w-100 pa2'>
        <label htmlFor="tel" className='f6 b db mb2' style={{display: 'block'}}>
          Tel:
        </label>
        <input
          id="tel"
          placeholder="Enter your contact number"
          type="text"
          value={values.tel}
          onChange={handleChange}
          className={errors.tel && touched.tel ? 'form-input-error form-input' : 'form-input'}
        />
        {
          errors.tel && touched.tel && 
          <div className='form-error-text'>
            {errors.tel}
          </div>
        }
      </div>

      <label htmlFor="address" className='f6 b db mb2' style={{display: 'block'}}>
        Address:
      </label>
      <textarea
        id="address"
        placeholder="Enter your address"
        value={values.address}
        onChange={handleChange}
        className={errors.address && touched.address ? 'form-input-error form-input' : 'form-input'}
      />
      {
        errors.address && touched.address && 
        <div className='form-error-text'>
          {errors.address}
        </div>
      }

      <div className='pa3'>
        <button
          type="button"
          className="dark-gray pv2 ph3 bg-white hover-bg-near-white ba b--moon-gray br2 hover-shadow-inner mr2"
          onClick={handleReset}
          disabled={!dirty || isSubmitting}>
          Clear
        </button>

        <button type="submit" className="white b pv2 ph3 bg-gray hover-bg-mid-gray bn br2 hover-shadow-inner" disabled={isSubmitting}> Create User </button>
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
    email: Yup.string().email('Invalid email').required('Email required')
  }),
  handleSubmit: (values, { setSubmitting }) => {
    console.log(JSON.stringify(values));
    fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(values)
    })
  },
  displayName: 'Create User', 
})(InnerUserForm);

export const UserForm = () => {
  return (
    <Formik />
  );
}