import React from 'react';




export default function PersonRow({ person, onDeleteClick, onEditClick, onCheckedClick, isChecked}) {


    const { firstName, lastName, age } = person;

    return (

        <tr>
            <td>
                <input className="form-check-input"
                    type="checkbox" checked={isChecked} onChange={onCheckedClick} />
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <button className="btn btn-warning" onClick={onEditClick}>Edit</button>
                <button className="btn btn-danger" onClick={onDeleteClick}>Delete</button>
            </td>
        </tr>
    )


}
