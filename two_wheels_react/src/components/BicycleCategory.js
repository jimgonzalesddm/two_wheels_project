import React from 'react';
import Bicycle from './Bicycle';

function BicycleCategory(props) {
	let displayBicycles = () => {
		return props.bicycles.map( bicycle => 
			<Bicycle
					key={bicycle.id}
					bicycle={bicycle}
					category={bicycle.category}
					model={bicycle.model}
					size={bicycle.size}
					price={bicycle.price}
					quantity={props.bikeRack[bicycle.id] ? props.bikeRack[bicycle.id] : 1}
					addToBikeRack={props.addToBikeRack}
					deleteBike={props.deleteBike}
					editPrice={props.editPrice}
			/>
		)
	}

	let displayBicycleCategory = () => {
		if(props.bicycles.length > 0) {
			return(
				<React.Fragment>
					<div className="jumbotron">
						<h1 className="text-monospace"> {(props.category).toUpperCase().replace(/-bike/i, ' BICYCLES')} </h1>
						<div className="card-columns">
							{ displayBicycles() }
						</div>
					</div>	
				</React.Fragment>
			);
		} else {
			return(
			<div className="jumbotron">
		        <h5 className="text-monospace text-center">NO BIKES AVAILABLE</h5>
		     </div> 
			);
		}
	}

	return(
		<React.Fragment>
			<div className="mt-5">
				{displayBicycleCategory()}
			</div>
		</React.Fragment>
	);
}

export default BicycleCategory;