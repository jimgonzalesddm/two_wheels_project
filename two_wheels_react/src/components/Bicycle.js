import React, { useState } from 'react';
// import './Bicycles.css';

function Bicycle(props) {
	let existingUser = JSON.parse(localStorage.getItem("user"));
	let [displayInputBicyclePrice, setDisplayInputBicyclePrice] = useState(false);
	let [bicyclePrice, setBicyclePrice] = useState(props.price);

	let [quantity, setQuantity] = useState(props.quantity);

	let atcClickHandler = () => {
		console.log(props.bicycle.id, quantity*1)
		props.addToBikeRack(props.bicycle.id, quantity*1);
		// setQuantity(1);
	}	
	
	// start functions for edit button
	function onChangeInputHandler(e) {
		setBicyclePrice(e.target.value.trim());
	}

	let editBtnClicked = () => {
		if(displayInputBicyclePrice === false) {
			return(
				setDisplayInputBicyclePrice(true)
			);
		}
	} 

	function onKeyPressHandler(e) {
		setBicyclePrice(e.target.value.trim());
		props.editPrice(props.bicycle, bicyclePrice);
		setDisplayInputBicyclePrice(false);
	}

	let displayOrChangeInputBicyclePrice =() => {
		if(displayInputBicyclePrice === false) {
			return(
				<span onClick={editBtnClicked} onBlur={onKeyPressHandler} className="p-2 bd-highlight">
					<i onClick={editBtnClicked} onBlur={onKeyPressHandler} className="fas fa-edit"></i>
					 Php {props.price}
				</span>
			);
		}
		else {
			return(
				<div className="p-2 flex-grow-1 bd-highlight">
					<form>
					<input 
							onChange={onChangeInputHandler}
							onBlur={onKeyPressHandler}
							className="form-control"
							type="number"
							id="bikeprice"
							autoComplete="off"
							value={bicyclePrice}
					/>
					</form>
				</div>
			);
		}
	}

	// Delete Btn
	let deleteClickHandler = () => {
		fetch("https://localhost:8080/bicycles/"+props.bicycle.id, {
			method: 'delete'
		});

		props.deleteBike(props.bicycle);
	}
	let displayBicycle = () => {
		if(existingUser.role.id === 2) {
			return(
				<React.Fragment>
					<div className="bike-cards" >
					  	<div className="card-header text-monospace bg-secondary">{(props.category.type).replace(/-bike/i, ' bike')}</div>
					    <img src={"http://localhost:8080/image/"+props.bicycle.image} className="card-img-top" alt="bicycle"/>
					    <div className="card-body text-monospace bg-secondary">
					      	<h5 className="card-title text-monospace">{props.model.name}</h5>
					      	<div>Size: {props.size.size}</div>
					     	<div clasNames="card-text text-monospace">Php {props.price}<br/>
					    	Quantity: <input 
					    				className="text-monospace"
							    		type="number" 
							    		min="1" 
							    		value={quantity}
							    		onChange={e => setQuantity(e.target.value)} 
							    	/><br/>
							<div className="d-block wd-100">  	
							<button onClick={atcClickHandler} className="btn btn-dark text-monospace mt-2" style={{width:"100%"}}>Rent<i className="fas fa-bicycle ml-3"></i></button>
							</div>
							</div>
				  		</div>
				  	</div>
			  	</React.Fragment>
			);
		}
		else {
			return (
				<React.Fragment>
				  	<div className="card-header text-monospace bg-secondary">{(props.category.type).replace(/-bike/i, ' bike')}</div>
				    <img src={"http://localhost:8080/image/"+props.bicycle.image} className="card-img-top" alt="..."/>
				    <div className="card-body d-flex justify-content-around">
				    	<div className="">
					    	<h5 className="card-title text-monospace text-secondary">{props.model.name}</h5>
					     	<div className="text-monospace text-secondary">Size: {props.size.size}</div>
					     	<p className="card-text text-monospace text-secondary">{displayOrChangeInputBicyclePrice()}</p>
						</div>
						<div className="align-self-center">
						<button onClick={deleteClickHandler}className="btn btn-dark">Delete Bike</button>
						</div>
			  		</div>
				</React.Fragment>
			  	
			);
		}
	}
	return(
		
			<div className="card text-white mb-3">

				{displayBicycle()}
			</div>
		
	);
}

export default Bicycle;