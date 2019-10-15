import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
// import Bicycle from './Bicycle';
import BicycleCategory from './BicycleCategory';
import './Bicycles.css';

let Bicycles = () => {
	
	let [bicycles, setBicycles] = useState([]);


	let touringBicycles = bicycles.filter( (bike) => bike.category.type === "touring-bike");
	let roadBicycles = bicycles.filter( (bike) => bike.category.type === "road-bike");
	let mountainBicycles = bicycles.filter( (bike) => bike.category.type === "mountain-bike");
	let foldingBicycles = bicycles.filter( (bike) => bike.category.type === "folding-bike");

	useEffect( () => {
		fetch("https://localhost:8080/bicycles/")
		.then(res => res.json())
		.then(data => {
			console.log(data)
			setBicycles(data);
		});
	}, []);

	let bikeRack = localStorage.getItem("bikeRack") ? JSON.parse(localStorage.getItem("bikeRack")) : []; 
	// functions for customer buttons
	let addToBikeRack = (id, quantity) => {
		let bicycle = bicycles.filter( bicycle => bicycle.id === id)
		bicycle[0].quantity = quantity;
		let item = bikeRack.filter( item => item.id === id)
		if(!item[0]) {
			bikeRack.push(bicycle[0]);
		} else {
			bikeRack = bikeRack.map( item => {
				if(item.id===id) {
					item.quantity += quantity
				}
				return item;
			})
		}
		localStorage.setItem("bikeRack", JSON.stringify(bikeRack));
		// localStorage.setItem("bicycle", JSON.stringify(bicycle));
		alert(quantity+" items added to bikeRack");
	}


	// functions for staff buttons
	let deleteBike = (bikeToDelete) => {
		let updatedBikeList = bicycles.filter( function(bike) {
			return (bikeToDelete.id !== bike.id)
		})
		setBicycles(updatedBikeList);
	}

	let editPrice = (bicycle, editedPrice) => {
		let updatedBikePrice = bicycles.map( function(bike) {
			if(bicycle.id===bike.id && editedPrice !== bike.price) {
				bike.price = editedPrice;
				fetch("https://localhost:8080/bicycles/edit-price/"+bike.id+"/"+bike.price, {
					method: 'put',
				})
				.then(res => res)
				.then(data => {
					console.log("hello")
				})
				return bike;
			} else {
				return bike;
			}
		});
		setBicycles(updatedBikePrice);
	}

	let displayTouringBicycles = () => {
		return(
			<BicycleCategory 
				bicycles={touringBicycles}
				category="touring-bike"
				bikeRack={bikeRack}
				addToBikeRack={addToBikeRack}
				deleteBike={deleteBike}
				editPrice={editPrice}
			/>
		); 
		
	}

	let displayRoadBicycles = () => {
		return(
			<BicycleCategory 
					bicycles={roadBicycles}
					category="road-bike"
					bikeRack={bikeRack}
					addToBikeRack={addToBikeRack}
					deleteBike={deleteBike}
					editPrice={editPrice}
			/>
		); 
		
	}

	let displayMountainBicycles = () => {
		return(
			<BicycleCategory 
					bicycles={mountainBicycles}
					category="mountain-bike"
					bikeRack={bikeRack}
					addToBikeRack={addToBikeRack}
					deleteBike={deleteBike}
					editPrice={editPrice}
			/>
		); 
		
	}

	let displayFoldingBicycles = () => {
		return(
			<BicycleCategory 
					bicycles={foldingBicycles}
					category="folding-bike"
					bikeRack={bikeRack}
					addToBikeRack={addToBikeRack}
					deleteBike={deleteBike}
					editPrice={editPrice}
			/>
		); 
		
	}


	return(
		<div className="jumbotron bikes-jumbotron mb-0 d-flex justify-content-around">
			<div className="bike-cards-div" >

				<nav className="navbar navbar-expand-sm bg-default justify-content-center ">
					<ul className="nav">
					  <li className="nav-item">
					    
					    <Link to="/bikes/touringBicycles" className="nav-link text-dark nav-link-bikes" >
					    
					     Touring </Link>
					  </li>
					  <li className="nav-item">
					   
					    <Link to="/bikes/roadBicycles" className="nav-link text-dark nav-link-bikes" >
					     Road </Link>
					  </li>
					  <li className="nav-item">
					    
					    <Link to="/bikes/mountainBicycles" className="nav-link text-dark nav-link-bikes" > 
					    Mountain </Link>
					  </li>

					   <li className="nav-item">
					    
					    <Link to="/bikes/foldingBicycles" className="nav-link text-dark nav-link-bikes" > 
					    Folding </Link>
					  </li>
					</ul>
				</nav>

				<Route 
					path="/bikes/touringBicycles"
					exact render={displayTouringBicycles}
				/>
				<Route 
					path="/bikes/roadBicycles"
					exact render={displayRoadBicycles}
				/>
				<Route 
					path="/bikes/mountainBicycles"
					exact render={displayMountainBicycles}
				/>
				<Route 
					path="/bikes/foldingBicycles"
					exact render={displayFoldingBicycles}
				/>


				<div className="jumbotron d-flex justify-content-around">
					<a href={"https://evanscycles.com/en-jp/help/bike-sizing-road"} target="_blank" id="refer-sizes"><h5>Refer sizes here</h5></a>
					<div className="touring-road">
						<Link to="/bikes/touringBicycles" className="nav-link text-dark nav-link-bikes" >
						    
							<img src={require('../images/touring-bike.png')} className="img-link" alt="..."/>
						</Link>
						<Link to="/bikes/roadBicycles" className="nav-link text-dark nav-link-bikes" >
						    <img src={require('../images/road-bike.png')} className="img-link mt-5" alt="..."/>
						</Link>
					</div>

					<div className="mountain-folding">
						<Link to="/bikes/mountainBicycles" className="nav-link text-dark nav-link-bikes" > 
							<img src={require('../images/mountain-bike2.png')} className="img-link" alt="..."/>
						</Link>
						<Link to="/bikes/foldingBicycles" className="nav-link text-dark nav-link-bikes" > 
							<img src={require('../images/folding-bike.png')} className="img-link-folding mt-5" alt="..."/>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Bicycles;