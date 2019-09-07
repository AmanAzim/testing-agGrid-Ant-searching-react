import React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Icon } from 'antd';




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(1, "Must have a character").max(255, "Must be shorter that 255").required("Must enter a name"),
    lastName: Yup.string().min(1, "Must have a character").max(255, "Must be shorter that 255").required("Must enter a name"),
    email: Yup.string().email("Must be an email").max(255, "Must be shorter that 255").required("Must enter an email"),
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) =>{

  const errorMsg = touched[field.name] && errors[field.name];

  return (
    <Form.Item help={errorMsg} validateStatus={errorMsg? "error" : undefined}>
      <Input {...field} {...props} />
    </Form.Item>
  )
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const testField = () => {

    const onSubmitHandler =(values, {setSubmitting, resetForm}) => {
        setSubmitting(true);
        console.log(values);
        setTimeout(()=>{
          alert(JSON.stringify(values, null, 2));
          resetForm();
          setSubmitting(false);
        }, 500);
    };

    return (
     <Formik
        initialValues={{firstName:'', lastName:'', email:''}}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting})=>(
           <form onSubmit={handleSubmit}>
            <div style={{margin:'10px', padding:'10px', width:'40%'}}>
              <Field
                type="text"
                name="firstName"
                placeholder='Enter your first name'
                prefix={<Icon type="user" style={{color:'green'}}/>}
                component={CustomInputComponent}
              />
            </div>

            <div style={{margin:'10px', padding:'10px', width:'40%'}}>
              <Field
                type="text"
                name="lastName"
                placeholder='Enter your last name'
                prefix={<Icon type="user" style={{color:'green'}}/>}
                render={({field, form: { touched, errors }})=>{
                  const errorMsg = touched[field.name] && errors[field.name];
                  return (
                    <Form.Item help={errorMsg} validateStatus={errorMsg? "error" : undefined}>
                      <Input {...field}/>
                    </Form.Item>
                  )
                }}
              />
            </div>

            <div style={{margin:'10px', padding:'10px', width:'40%'}}>
              <Field
                type="email"
                name="email"
                placeholder='Enter your email'
                className={touched.email && errors.email ? "error": null}
                component={CustomInputComponent}
              />
            </div>
            <div style={{margin:'10px', padding:'10px'}}>
              <button type="submit" disabled={isSubmitting}>Submit</button>
            </div>
           </form>
        )}
     </Formik>
    );
}

export default testField;

