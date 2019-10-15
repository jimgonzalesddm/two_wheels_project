import React, { useState, useEffect } from 'react';
import Rental from './Rental';

function Rentals() {
	let [rentals, setRentals] = useState([]);
	
	console.log(rentals)


	// useEffect( () => {
	// 	fetch("http://localhost:8080/rentals/")
	// 	.then(res => res.json())
	// 	.then(data => {
	// 		console.log(data)
	// 		setRentals(data);
	// 	});
	// }, []);
	useEffect( () => {
		fetch("https://localhost:8080/rentaldetails/")
		.then(res => res.json())
		.then(data => {
			console.log(data)
			setRentals(data);
		});
	}, []);

	let displayRentals = () => {
		if(rentals.length > 0) {
			return(
				rentals.map( rental => 
					<Rental key={rental.id}
							rentaldetail={rental}
							rental={rental.rentalDetailRental}
							bicycle={rental.rentalDetailBicycle}
							changeStatus={changeStatus}
					/>
				)	
			);
			
		}
		else {
			return(
				<div className="jumbotron d-fles justify-content-center">
			        <h5 className="text-monospace text-center">You have no rentals to display yet.</h5>
			    </div>
			);
		}
	}

	let changeStatus = (statusId, userId, rental) => {
		fetch("https://localhost:8080/rentals/"+userId+"/"+statusId, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(rental)

		})
	}

	return(
		<div className="jumbotron mb-0 jumbotron-rentals">
			<div style={{height:"100vh"}}>
				<h1 className="text-center">Rentals</h1>
				<div className="row">
					{displayRentals()}
				</div>
			</div>
		</div>
	);
}

export default Rentals;