import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom'
import './LogInField.css';

import CreateAccountField from './CreateAccountField';
import TwoWheels from './TwoWheels';

function LogInField(props) {


	let [username, setUsername] = useState("");
	let [password, setPassword] = useState("");

	let usernameChangeHandler = (e) => {
		setUsername(e.target.value)
	}

	let passwordChangeHandler = (e) => {
		setPassword(e.target.value)
	}

	let signinClickHandler = () => {
		let user = {
			username,
			password
		}
		fetch("https://localhost:8080/users/login", {
			method: 'post',
			headers: {
				'Content-Type': 'application/json' 
			},
			body: JSON.stringify(user)
		})
		.then(res => res.json())
		.then(data => {
			localStorage.setItem("userId", data.id);
			localStorage.setItem("username",username);
			localStorage.setItem("user",JSON.stringify(data));
			props.setIsLoggedIn(true);
		})
		.catch(e => {
			alert("Login failed")
			console.log(e)
		});
		return (
			<div>
			Hello User
			</div>
			);
	}

	return(
		<div className="backdrop d-flex bd-highlight justify-content-end p-5">
			<div className="text-right d-flex flex-column justify-content-center w-100 bd-highlight col-12 col-md-6 login-field">
				<h1 className="text-right text-monospace">Login</h1>

				<form className="form-group">
					<label htmlfor="username"><i className="fa fa-user"></i></label>
					<input 
							placeHolder="Username"
							onChange={usernameChangeHandler}
							type="text" 
							id="usernameLogin" 
							className="form-control text-right
										border border-top-0 
										border-left-0
										bg-transparent
										text-monospace"
							autoComplete="off"
							value={username}
					/>

					<label htmlfor="password"><i className="fa fa-key mt-2"></i></label>
					<input 
							placeHolder="Password"
							onChange={passwordChangeHandler}
							type="password" 
							id="passwordLogin" 
							className="form-control text-right
										border border-top-0 
										border-left-0
										bg-transparent
										text-monospace"
							autoComplete="off"
							value={password}
					/>
					
					<Link 	to="/home"
							type="button" 
							id="signinBtn"
							onClick={signinClickHandler}
							className="btn btn-secondary mt-5 text-success"
					> 
					
					SIGN IN
				
					</Link>
					
				
					<div className="mt-4"><small className="text-monospace">
						Not yet a customer?
						<Link to="/create-account" 
							className="ml-2 text-success font-weight-bold create-text"> 
							Create an account </Link>
						</small></div>
		
				</form>
			</div>
		</div>
	);
}

export default LogInField;
