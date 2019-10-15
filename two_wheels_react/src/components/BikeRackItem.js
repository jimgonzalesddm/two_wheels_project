import React from 'react';
import './BikeRackItem.css';

let BikeRackItem = (props) => {
	
	let deleteIconOnClickHandler = () => {
		props.delete(props.bicycle)
	}

	return(
		<tr>
			<td>{props.bicycle.model.name}</td>
			<td>{props.bicycle.price}</td>
			<td>{props.bicycle.quantity}</td>
			<td>{(props.bicycle.quantity * props.bicycle.price).toLocaleString()}</td>
			<td><i id="deleteicon" onClick={deleteIconOnClickHandler} className="fas fa-times fa-2x mt-2" style={{color:"red"}}></i></td>
		</tr>
	);
}

export default BikeRackItem;