import React from 'react';
import { Formik, Field, Form as FForm, FieldArray, getIn } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Icon } from 'antd';




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const validationSchema = Yup.object().shape({
  people: Yup.array().of(
    Yup.object().shape({
      firstName: Yup.string().min(1, "Must have a character").max(255, "Must be shorter that 255").required("Must enter a name"),
      lastName: Yup.string().min(1, "Must have a character").max(255, "Must be shorter that 255").required("Must enter a name"),
      email: Yup.string().email("Must be an email").max(255, "Must be shorter that 255").required("Must enter an email"),
    })
  )
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) =>{

  const touch = getIn(touched, field.name);
  const error = getIn(errors, field.name);
  const errorMsg = touch && error;

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
        initialValues={{people:[{firstName:'', lastName:'', email:''}]}}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
        render={({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting})=>(
           <form onSubmit={handleSubmit}>
             <FieldArray
                name="people"
                render={({push, remove})=>(
                  <React.Fragment>
                      {values.people.map((person, index)=>{
                        return (
                          <React.Fragment>
                            <div  style={{margin:'10px', padding:'10px', width:'40%'}}>
                              <Field
                                type="text"
                                name={`people[${index}].firstName`}
                                value={person.firstName}
                                placeholder='Enter your first name'
                                prefix={<Icon type="user" style={{color:'green'}}/>}
                                component={CustomInputComponent}
                              />
                            </div>
                            <div  style={{margin:'10px', padding:'10px', width:'40%'}}>
                              <Field
                                type="text"
                                name={`people[${index}].lastName`}
                                value={person.lastName}
                                placeholder='Enter your last name'
                                prefix={<Icon type="user" style={{color:'blue'}}/>}
                                component={CustomInputComponent}
                              />
                            </div>
                            <div  style={{margin:'10px', padding:'10px', width:'40%'}}>
                              <Field
                                type="email"
                                name={`people[${index}].email`}
                                placeholder='Enter your email'
                                prefix={<Icon type="email" style={{color:'blue'}}/>}
                                component={CustomInputComponent}
                              />
                            </div>
                            <div style={{margin:'10px', padding:'10px'}}>
                              <button type="button" onClick={()=>remove(index)}>Remove</button>
                            </div>
                          </React.Fragment>
                        );
                      })}
                      <div style={{margin:'10px', padding:'10px'}}>
                        <button type="button" onClick={()=>push({firstName:'', lastName:'', email:''})}>Add to list</button>
                      </div>
                      <pre>
                        {JSON.stringify(values, null ,2)}
                      </pre>
                  </React.Fragment>
                )}
             />
              <div style={{margin:'10px', padding:'10px'}}>
                  <button type="submit" disabled={isSubmitting}>Submit</button>
              </div>
           </form>
        )}
     />
    );
}

export default testField;

