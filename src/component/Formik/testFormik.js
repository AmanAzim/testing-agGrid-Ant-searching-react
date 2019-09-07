import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
    name: Yup.string().min(1, "Must have a character").max(255, "Must be shorter that 255").required("Must enter a name"),
    email: Yup.string().email("Must be an email").max(255, "Must be shorter that 255").required("Must enter an email"),
});

const Error =({touched, message})=>{
  if(!touched){
    return <div></div>
  }
  if(message){
    return <div>{message}</div>
  }
  return <div>All good</div>
}

const FormikExample = () => {
    return (
     <Formik
        initialValues={{name:'', email:''}}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting, resetForm})=>{
          setSubmitting(true);
          setTimeout(()=>{
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          }, 500);
        }}
        >
        {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting})=>(
           <form onSubmit={handleSubmit}>
            {JSON.stringify(values)}
            <div style={{margin:'10px', padding:'10px'}}>
              <lebel htmlFor="Name">Name</lebel>
              <input
                type="text"
                name="name"
                id='name'
                placeholder='Enter your name'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className={touched.name && errors.name ? "error": null}
              />
              <Error touched={touched.name} message={errors.name} />
            </div>
            <div style={{margin:'10px', padding:'10px'}}>
              <lebel htmlFor="Email">Email</lebel>
              <input
                type="email"
                name="email"
                id='email'
                placeholder='Enter your email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={touched.email && errors.email ? "error": null}
              />
               <Error touched={touched.email} message={errors.email} />
            </div>
            <div style={{margin:'10px', padding:'10px'}}>
              <button type="submit" disabled={isSubmitting}>Submit</button>
            </div>
           </form>
        )}
     </Formik>
    );
}

export default FormikExample;

