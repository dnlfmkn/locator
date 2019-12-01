import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Input(props) {
  return <div className="form-group">
    <label>{props.label}</label>
    <input
     id={props.id}
     name={props.id}
     type={props.type}
     value={props.value}
     onChange={props.onChange}
     className="form-control"
     required/>
    <div className="invalid-feedback">
      {props.message}
    </div>
  </div>
}