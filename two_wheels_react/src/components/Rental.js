import React, { useState, useEffect } from 'react';
import './Rental.css';

function Rental(props) {
	let currentUser = JSON.parse(localStorage.getItem("user"));
	let rentalDate = (props.rental.rental_date).slice(0, 10);
	let returnDate = (props.rental.return_date).slice(0, 10);
	let [currentStatus, setCurrentStatus] = useState((props.rental.status.status).toUpperCase());

	let [status, setStatus] = useState([]);
	let[statusId, setStatusId] = useState("");
	console.log(currentUser)
	useEffect( () => {
		fetch("https://localhost:8080/status/")
		.then(res => res.json())
		.then(data => {
			console.log(data)
			setStatus(data);
		});
	}, []);

	let displayStatusOptions = () => 
		status.map( status => <option key={status.id} value={status.id} >{status.status}</option>)

	let statusChangeHandler = (e) => {
		setStatusId(e.target.value)
		// setCurrentStatus(e.target.name);	
		// onClickChangeHandler(e.target.value);
		console.log(e.target.value);
		props.changeStatus(e.target.value, props.rental.user.id, props.rental);

	}

	let onClickChangeHandler = () => {
		window.location.reload();
	}
	

	let displayRentals = () => {
		if(currentUser.role.id === 1) {
			return(
				<div className="col-sm-3">
				    <div className="card-staff-rental">
				      	<div className="card-body">
					        <h5 className="card-title text-monospace">#{props.rental.id} {currentStatus}</h5>
					        <div className="card-text text-monospace">Customer: {props.rental.user.firstName} {props.rental.user.lastName} <br/>
					       	 	Rental Date: {rentalDate}<br/>
					        	Return Date: {returnDate}<br/>
					        <div className="d-flex justify-content-around bg-secondary">
						        <div>
						        	<img src={"http://localhost:8080/image/"+props.bicycle.image} className="bike-img-rental" alt="..."/> <br/>
						        </div>
						        <div className="d-flex align-self-center text-monospace">
							        {props.bicycle.model.name}<br/>
							        Quantity: {props.rentaldetail.quantity}<br/>
							        Size: {props.bicycle.size.size}</div>

						        </div>
					        </div>
					        <div className="text-center text-monospace">Total: Php {props.rental.total_amount}</div>
					        Change status to:
							<select className="form-control" onChange={statusChangeHandler}>
								<option></option>
								{displayStatusOptions()}
							</select>
							<div className="d-block wd-100">
								<button onClick={onClickChangeHandler} className="btn btn-warning mt-2 updateBtn"> UPDATE </button>
					      	</div>
				      	</div>
				    </div>
				</div>
			);
		}
		else {
			if(currentUser.id === props.rental.user.id){
				return(	
					<div className="col-sm-3">
					    <div className="card-customer-rental">
					      	<div className="card-body">
						       	<h5 className="card-title text-monospace">{currentStatus}</h5>
						        <div className="card-text text-monospace">Customer: {props.rental.user.firstName} {props.rental.user.lastName} <br/>
						       	 	Rental Date: {rentalDate}<br/>
						        	Return Date: {returnDate}<br/>
						        <div className="d-flex justify-content-around">
						        <div>
						        	<img src={"http://localhost:8080/image/"+props.bicycle.image} className="bike-img-rental" alt="..."/> <br/>
						        </div>
						        <div className="d-flex align-self-center text-monospace">{props.bicycle.model.name}<br/>
						        	Quantity: {props.rentaldetail.quantity}<br/>
						        	Size: {props.bicycle.size.size}</div>
						        </div>
						        <div className="text-center text-monospace">Total: Php {props.rental.total_amount}</div>
						        </div>
					      	</div>
					    </div>
					</div>
				);
			}
		}
	}

	return(
		<React.Fragment>
			{displayRentals()}
		</React.Fragment>
	);
}

export default Rental;