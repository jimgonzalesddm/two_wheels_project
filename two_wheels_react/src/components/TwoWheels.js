import React from'react';
import './TwoWheels.css';

function TwoWheels() {

	return(
		<React.Fragment>
			<section id="header" className="jumbotron d-flex justify-content-end">
				<div className=" align-self-center">
					<h1 className="animated fadeIn">
					Experience Nature from a Bike
					</h1>
				</div>	
			</section>
		
			<div className="jumbotron d-flex align-items-center bike-for-rent-div">
				<div className="bike-for-rent-left flex-column ml-5">
				<h2 className="text-monospace">Bicycle for Rent</h2>
				<h3 className="ml-5 text-monospace">..ready to ride?</h3>
				</div>
			</div>

			
			<div className="d-flex justify-content-around mt-5">
			
			  	<div className="card text-white bg-secondary mb-3 categoryCard">
				    <img src={require('../images/touring.jpg')} className="card-img" alt="..."/>
				    <div className="card-img-overlay d-flex justify-content-center">
				      	<h3 className="card-title align-self-center">Touring</h3>
				    </div>
			  	</div>
			   	<div className="card text-white bg-secondary mb-3 categoryCard">
				    <img src={require('../images/bicycle-cycling-cyclist.jpg')} className="card-img" alt="..."/>
				    <div className="card-img-overlay d-flex justify-content-center">
				      	<h3 className="card-title align-self-center">Road</h3>
				    </div>
			  	</div>
			</div>

			<div className="d-flex justify-content-around mb-5">
			  	<div className="card text-white bg-secondary mb-3 categoryCard">
				    <img id="cc-mountain"src={require('../images/mountainbike.jpg')} className="card-img categoryCard" alt="..."/>
				    <div className="card-img-overlay d-flex justify-content-center">
				      	<h3 className="card-title align-self-center">Mountain</h3> 
				    </div>
			  	</div>
			   	<div className="card text-white bg-secondary mb-3 categoryCard">
				    <img src={require('../images/foldingcategory.jpg')} className="card-img" alt="..."/>
				    <div className="card-img-overlay d-flex justify-content-center">
				      	<h3 className="card-title align-self-center">Folding</h3>
				    </div>
			  	</div>
			</div>
			

			<div className="jumbotron accessories text-center">
				<h2 className="mt-1 text-monospace"> ..Accessories included </h2>
				<img src={require('../images/helmet.png')} className="helmet" alt="..."/>
				<img src={require('../images/light.png')} className="light" alt="..."/>
				<img src={require('../images/bottlecage.png')} className="bottle-cage" alt="..."/>
				<div className="accessories-cap text-center"> 
					<p className="text-monospace">Each rented bike comes with a HELMET to keep you protected incase of accident
						, FRONT AND REAR LIGHTS to help you during dark and for you to be visible
						, a BOTTLE CAGE for your water bottle to keep you hydrated throughout your ride
						, and a BIKE LOCK to secure your bike.</p>
				</div>
			</div>

			<div className="jumbotron brandlogos">
				<div className=" d-flex justify-content-around">
					<img src={require('../images/giant.png')} id="brandlogo-giant" alt="..."/>
					<img src={require('../images/specialized.png')} id="brandlogo-specialized" alt="..."/>
					<img src={require('../images/cube.png')} id="brandlogo-cube" alt="..."/>
				</div>
				<div className=" d-flex justify-content-around">
					<img src={require('../images/kona.png')} id="brandlogo-kona" alt="..."/>
					<img src={require('../images/cannondale.png')} id="brandlogo-cannondale" alt="..."/>
					
				</div>
			</div>

		</React.Fragment>
	);
}

export default TwoWheels;