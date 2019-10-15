import React, { useState }  from 'react';
import { Link, Route } from 'react-router-dom';
import './BikeRack.css';

import BikeRackItem from './BikeRackItem';
import CreateAccountField from './CreateAccountField';

let BikeRack = () => {
	let [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("username") ? true : false)
	
	let [bikeRack, setBikeRack] = useState(localStorage.getItem("bikeRack") ? JSON.parse(localStorage.getItem("bikeRack")) : []);

	let [rentalDate, setRentalDate] = useState("");
	let [returnDate, setReturnDate] = useState("");
	let [totalRentalDays, setTotalRentalDays] = useState("");

	let total = (bikeRack.reduce( (total, item) => total =(total+ (item.price*item.quantity))*totalRentalDays, 0));
	
	// let renderCreateAccountField = () => 
 //    	<CreateAccountField setIsLoggedIn={setIsLoggedIn} /> 

	let displayBikeRackItems = () =>
		bikeRack.map( bicycle => 
			<BikeRackItem key={bicycle.id} bicycle={bicycle} delete={deleteBicycle}/>
		)

	// rental and return date functions
	let rentalDateChangeHandler = (e) => {
		setRentalDate(e.target.value);
	}

	let returnDateChangeHandler = (e) => {
		setReturnDate(e.target.value);
		totalDaysCalculator(e.target.value);
	}

	let totalDaysCalculator = (returnDate) => {
		let oneDay = 12*60*60*1000; // hours*minutes*seconds*milliseconds
		let firstDate = new Date(rentalDate);
		let secondDate = new Date(returnDate);

		let diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
		if(rentalDate === returnDate) {
			setTotalRentalDays(1);
		}
		else {
			setTotalRentalDays(diffDays);
		}
	}

	// delete function
	let deleteBicycle = (bicycle) => {
		let updatedBikeRack = bikeRack.filter( function(bike) {
			return (bicycle.id !== bike.id); 
		});
		setBikeRack(updatedBikeRack);
		// localStorage.removeItem("bicycle");
		localStorage.setItem("bikeRack", JSON.stringify(updatedBikeRack));

		// localStorage.setItem("bikeRack", JSON.stringify(bikeRack));		
	}

	// checkout btn
	// let checkoutBtn = () => {
	// 	if(isLoggedIn) {
	// 		return(
	// 			<button onClick={checkoutClickHandler} className="btn btn-dark">Checkout</button>
	// 		);
	// 	}
	// 	else {
	// 		return(
	// 			<React.Fragment>
	// 				<Link to="/login">
	// 					<button onClick={checkoutClickHandler} className="btn btn-dark">Checkout</button>
	// 				</Link>

	// 				<Route path="(/login" exact component={CreateAccountField}/>
	// 			</React.Fragment>
	// 		);
	// 	}
	// }
	let checkoutClickHandler = () => {
		if(isLoggedIn) {
			if(bikeRack.length > 0 &&
				rentalDate !== "" &&
				returnDate !== "" &&
				totalRentalDays !== "") {
				let newRental = {
					rental_date: rentalDate,
					return_date: returnDate,
					total_rental_days: totalRentalDays,
					total_amount: total*1
				}
					console.log(localStorage.getItem("userId"));
					console.log(total);
				fetch("https://localhost:8080/rentals/"+localStorage.getItem("userId")+"/"+ 1, {
					method: 'post',
					headers: {
						'Content-Type' : 'application/json'
					},
					body: JSON.stringify(newRental)
				})
				.then(res => res.json())
				.then(rental => {
					localStorage.setItem("rental",JSON.stringify(rental));
					console.log(JSON.stringify(rental))
					bikeRack.map( item => {
						fetch("https://localhost:8080/rentaldetails/"+rental.id+"/"+item.id, {
							method: 'post',
							headers: {
								'Content-Type' : 'application/json'
							},
							body: JSON.stringify({ quantity: item.quantity })
						})
					});
				});	
				alert("checkout successful");
				localStorage.removeItem("bikeRack");
			}
			else {
				alert("You need to fill out everything");
			}
		}
		else {}
	}

	return(
		<div className="jumbotron bikeRack-jumbotron">
			<h1>Bike Rack</h1>
			<table className="table table-striped bikeRack-table">
				<thead>
					<tr>
						<th>Bike</th><th>Price</th><th>Quantity</th><th>Subtotal</th>
					</tr>
				</thead>
				<tbody>
					{displayBikeRackItems()}
					<tr>
						<td></td><td></td><td>Total: </td><td>{total.toLocaleString()}</td>
					</tr>
					
				</tbody>
			</table>

			<form>
			  	<div className="date-div">
			    	<label htmlFor="rentaldate">Rental date:</label><br/>
			    	<input type="date" 
			    		id="rentaldate" 
			    		className="dates-input ml-3"
			    		name="rentaldate" 
			    		min="2019-04-01" 
			    		max="2020-04-30"
			    		onChange={rentalDateChangeHandler}
			    		required/><span className="validity"></span>
				</div>
			 	<div className="date-div">
			    	<label htmlFor="returndate">Return date:</label><br/>
			    	<input type="date" 
			    		id="returndate"
			    		className="dates-input ml-3"
			    		name="returndate" 
			    		min="2019-04-01" 
			    		max="2020-04-30"
			    		onChange={returnDateChangeHandler}
			    		required/><span className="validity"></span>
			  	</div>
			  	<div>
			  		Total number of days: {totalRentalDays}
			  	</div>
			</form>
			<button onClick={checkoutClickHandler} className="btn btn-dark">Checkout</button>
		</div>
	);
}

export default BikeRack;