import React from 'react'
import { Field, ErrorMessage ,useField} from 'formik';
import './Utils.css'

export const NewFieldArray = ({name ,...props}) => {
    const [field, meta] = useField(props);
    return (
        <div>
        
            <Field
                className={`normal ${meta.touched && meta.error && 'error'}`}
                {...field} {...props}
                autoComplete="off"
            />
            <ErrorMessage component="div" name={field.name} className="error-message" />
        </div>
    )
}

