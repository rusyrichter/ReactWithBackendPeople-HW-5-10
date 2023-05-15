import React from 'react';

export default function AddPersonForm({ firstName, lastName, age, onTextChange, onAddClick, onCancelClick, onUpdateClick, editMode }) {
    if (!editMode) {
        return <div className="row p-5 rounded">
            <div className="col-md-3">
                <input value={firstName} onChange={onTextChange} name='firstName' type="text" className="form-control" placeholder="First Name" />
            </div>
            <div className="col-md-3">
                <input value={lastName} onChange={onTextChange} name='lastName' type="text" className="form-control" placeholder="Last Name" />
            </div>
            <div className="col-md-3">
                <input value={age} onChange={onTextChange} name='age' type="text" className="form-control" placeholder="Age" />
            </div>
            <div className="col-md-3">
                <button onClick={onAddClick} className='btn btn-primary w-100'>Add</button>
            </div>
        </div>
    }

    return <div className="row p-5 rounded">
        <div className="col-md-3">
            <input value={firstName} onChange={onTextChange} name='firstName' type="text" className="form-control" placeholder="First Name" />
        </div>
        <div className="col-md-3">
            <input value={lastName} onChange={onTextChange} name='lastName' type="text" className="form-control" placeholder="Last Name" />
        </div>
        <div className="col-md-3">
            <input value={age} onChange={onTextChange} name='age' type="text" className="form-control" placeholder="Age" />
        </div>
        <div className="col-md-3">
            <button onClick={onAddClick} className='btn btn-primary w-100'>Edit</button>
        </div>
        <div className='col-md-3'>
            <button type="button" className="btn btn-warning mr-2" onClick={onUpdateClick} >Update</button>
            <button type="button" className="btn btn-danger" onClick={onCancelClick}>Cancel</button>
        </div>
    </div>
}
