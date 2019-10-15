import React, { useState, useEffect } from 'react';
import './AddBicycleForm.css';

function AddBicycleForm() {
	let [categories, setCategories] = useState([]);
	let [models, setModels] = useState([]);
	let [sizes, setSizes] = useState([]);

	let [price, setPrice] = useState("");

	let [modelId, setModelId] = useState("");
	let [sizeId, setSizeId] = useState("");
	let [categoryId, setCategoryId] = useState("");

	let [file, setFile] = useState("");

	useEffect( () => {
		fetch("https://localhost:8080/categories/")
		.then( res => res.json())
		.then( data => {
			setCategories(data);
		})
	}, []);
	useEffect( () => {
		fetch("https://localhost:8080/models/")
		.then( res => res.json())
		.then( data => {
			setModels(data);
		})
		
	}, []);
	useEffect( () => {
		fetch("https://localhost:8080/sizes/")
		.then( res => res.json())
		.then( data => {
			setSizes(data);
		})
	}, []);


	let displayCategoryOptions = () => 
		categories.map( cat => <option key={cat.id} value={cat.id}>{cat.type}</option>)

	let displayModelOptions = () => 
		models.map( model => <option key={model.id} value={model.id}>{model.name}</option>)

	let displaySizeOptions = () => 
		sizes.map( size => <option key={size.id} value={size.id}>{size.size}</option>)


	let categoryChangeHandler = (e) => {
		setCategoryId(e.target.value)
	}

	let modelChangeHandler = (e) => {
		setModelId(e.target.value)
	}

	let sizeChangeHandler = (e) => {
		setSizeId(e.target.value)
	}

	let priceChangeHandler = (e) => {
		setPrice(e.target.value)
	}

	let submitClickHandler = () => {
		let newBicycle = {
			price
		}

		fetch("https://localhost:8080/bicycles/"+categoryId+"/"+modelId+"/"+sizeId, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newBicycle)
		})
		.then(res => res.json())
		.then(data => {

			let formData = new FormData();
			formData.append("file", file);

			fetch("https://localhost:8080/bicycles/upload/"+data.id, {
				method: 'post',
				body: formData
			})			
		});

		setPrice("");
		setModelId("");
		setCategoryId("");
		setSizeId("");
	}

	let imageChangeHandler = (e) => {
		setFile(e.target.files[0]);
	}

	return(
		<div className="jumbotron jumbotron-addbicycle mb-0">
			<div id="addbike-image"></div>
			<h1 className="text-center text-monospace">Add New Bicycle</h1>
			<div id="addbike-form" className="col-12 col-md-4 offset-4 text-center">
				<form encType="multipart/form-data">
					<div className="form-group">
						<select className="form-control" onChange={categoryChangeHandler}>
							<option>Category:</option>
							{displayCategoryOptions()}
						</select>
					</div>
					<div className="form-group">
						<select className="form-control" onChange={modelChangeHandler}>
							<option>Model:</option>
							{displayModelOptions()}
						</select>
					</div>
					<div className="form-group">
						<select className="form-control" onChange={sizeChangeHandler}>
							<option>Size:</option>
							{displaySizeOptions()}
						</select>
					</div>
					<div className="form-group">
						<input placeHolder="Php" onChange={priceChangeHandler} type="number" className="form-control"/>
					</div>
					Image: <input onChange={imageChangeHandler} type="file"/> <br/>
					<button id="addBikeBtn" type="button" onClick={submitClickHandler} className="btn btn-success mt-3">Add <i className="fas fa-bicycle"></i></button>
				</form>
			</div>
		</div>
	);
}

export default AddBicycleForm;