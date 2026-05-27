//  <Input label={} id={} type={} placeholder={} value={} onChange={}/>

import  type {  ComponentPropsWithRef } from "react";

type InputProps = ComponentPropsWithRef<"input"> & {
    label: string;
}

function Input(props: InputProps){

    const {label, id,ref, ...inputProps}  = props;

    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <input ref={ref} className="form-control" id={id} {...inputProps}  />
        </div>
    )
}

export default Input;