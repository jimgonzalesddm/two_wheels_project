import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import './CreateAccountField.css';

function CreateAccountField() {
	let [users, setUsers] = useState([]);

	useEffect( () => {
		fetch("https://localhost:8080/users/")
		.then(res => res.json())
		.then(data => {
			setUsers(data);
		});
	}, []);

	let [firstname, setFirstname] = useState("");
	let [lastname, setLastname] = useState("");
	let [address, setAddress] = useState("");
	let [email, setEmail] = useState("");
	let [username, setUsername] = useState("");
	let [password, setPassword] = useState("");
	let [confirmpw, setConfrimpw] = useState("");
	let [firstnameAlert, setFirstnameAlert] = useState("");
	let [lastnameAlert, setLastnameAlert] = useState("");
	let [addressAlert, setAddressAlert] = useState("");
	let [emailAlert, setEmailAlert] = useState("");
	let [usernameAlert, setUsernameAlert] = useState("");
	let [passwordAlert, setPasswordAlert] = useState("");
	let [confirmpwAlert, setConfirmpwAlert] = useState("");

	let [disabledBtn, setDisabledBtn] = useState(true);
	let [staffpw, setStaffpw] = useState("");
	let [staffpwAlert, setStaffpwAlert] = useState("");

	let [roles, setRoles] = useState([]);
	let [roleId, setRoleId] = useState("")

	function firstnameOnChangeHandler(e) {
		setFirstname(e.target.value.trim());
		register();
		if(e.target.value === "") {
			setFirstnameAlert("First name is required.");
		} else {
			setFirstnameAlert("");
		}
	}

	function lastnameOnChangeHandler(e) {
		setLastname(e.target.value.trim());
		if(e.target.value === "") {
			setLastnameAlert("Last name is required.");
		} else {
			setLastnameAlert("");
		}
	}

	function addressOnChangeHandler(e) {
		setAddress(e.target.value.trim());
		if(e.target.value === "") {
			setAddressAlert("Address is required.");
		} else {
			setAddressAlert("");
		}
	}

	function emailOnChangeHandler(e) {
		setEmail(e.target.value.trim());
		if(e.target.value === "") {
			setEmailAlert("Email is required.");
		}  
		else {
			setEmailAlert("");
			
		}
	}

	function usernameOnChangeHandler(e) {
		setUsername(e.target.value.trim());
		 if(e.target.value === "") {
			setUsernameAlert("Username is required.")
		} 
		else if(e.target.value) {
			let errorFlag = undefined;
			users.forEach( function(user) {
				if(e.target.value === user.username) {
					errorFlag = true;
				}
			});
			if(errorFlag) {
				setUsernameAlert("Username is already taken");
			}
			else {
				setUsernameAlert("");
				
			}
			return usernameAlert;
		}
	}

	function passwordOnChangeHandler(e) {
		setPassword(e.target.value.trim());
		if(e.target.value === ""){
			setPasswordAlert("Password is required.");				
		}
		else{
			if(e.target.value !== confirmpw) {
				// setPasswordAlert("Passwords do not match.");
				setConfirmpwAlert("Passwords do not match.");	
			}
			else{
				setPasswordAlert("");
				setConfirmpwAlert("");
			}
		} 
	}

	function confirmpwOnChangeHandler(e) {
		setConfrimpw(e.target.value.trim());
		if(e.target.value === ""){
			setConfirmpwAlert("Password is required.");				
		}
		else{
			if(e.target.value !== password) {
				setPasswordAlert("Passwords do not match.");
				// setConfirmpwAlert("Passwords do not match.");	
			}
			else{
				setPasswordAlert("");
				setConfirmpwAlert("");
			}
		} 
	}

	function staffpwOnChangeHandler(e) {
		console.log(roleId)
		setStaffpw(e.target.value.trim());
		if(roleId === 1) {
			if(e.target.value === "") {
				setStaffpwAlert("Staff password is required.");
			}  
			else {
			}
		}
		else {
			setStaffpwAlert("");
		}
	}

// ROLE
	

	useEffect( () => {
		fetch("https://localhost:8080/roles/")
		.then( res => res.json())
		.then( data => {
			setRoles(data);
		})
	}, []);

	let displayRoleOptions = () => 
		roles.map( role => <option key={role.id} value={role.id}>{role.role}</option>)

	let roleChangeHandler = (e) => {
		setRoleId(e.target.value);
		// displayStaffpw(e.target.value);
		
	}

	function register() {
		console.log(firstname, lastname, address, email, username, password, confirmpw, roleId, staffpw)
		console.log(firstnameAlert, lastnameAlert, addressAlert, emailAlert, usernameAlert, passwordAlert, confirmpwAlert)

		if(firstnameAlert === "" && lastnameAlert === "" && addressAlert === "" &&
			emailAlert === "" && usernameAlert === "" && passwordAlert === "" && confirmpwAlert === "" &&
			firstname !== "" && lastname !== "" && address !== "" &&
			email !== "" && username !== "" && password !== "" && confirmpw !== "" 
			&& roleId === "2" && staffpw === ""
			) {
			console.log("hello"+roleId)
			if(disabledBtn) {
				setDisabledBtn(false);
			}

		}
		else if(firstnameAlert === "" && lastnameAlert === "" && addressAlert === "" &&
			emailAlert === "" && usernameAlert === "" && passwordAlert === "" && confirmpwAlert === "" &&
			firstname !== "" && lastname !== "" && address !== "" &&
			email !== "" && username !== "" && password !== "" && confirmpw !== "" 
			&& roleId === "1" && staffpw === "1234509876"
			) {
			if(disabledBtn) {
				setDisabledBtn(false);
			}
		}
		else {
			if(!disabledBtn)
			setDisabledBtn(true);
		}
	}

	register();

	function registerClickHandler() {
		let newUser = {
			firstName: firstname,
			lastName: lastname,
			address: address,
			email: email,
			username: username,
			password: password	
		}
		// implement front end validation here
		fetch("https://localhost:8080/users/register/"+roleId, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newUser)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
		});

		setFirstname("");
		setLastname("");
		setAddress("");
		setEmail("");
		setUsername("");
		setPassword("");
		setConfrimpw("");
	}

	
	// let displayStaffpw = (id) => {
	// 	console.log(id)
	// 	if(id === 1) {
	// 		return(
	// 			<input 
	// 				placeHolder="Enter Staff Password"
	// 				// onChange={firstnameOnChangeHandler}
	// 				type="password" 
	// 				id="staffpw" 
	// 				className="form-control text-monospace"
	// 				autoComplete="off"
	// 				value={staffpw}
	// 			/>
	// 		);
	// 	}
	// 	else {}
		
	// }

	return(

		<div className="jumbotron jumbotron-create-account">
			<div id="create-acct-image"></div>
			<h1 className="text-monospace">Create New Account</h1>
			<div id="create-account-field" className="col-12 col-md-6 offset-3 text-center">

				<form className="form-group">
					<label htmlfor="firstname"></label>
					<input 
							placeHolder="First Name"
							onChange={firstnameOnChangeHandler}
							type="text" 
							id="firstname" 
							className="form-control text-monospace"
							autoComplete="off"
							value={firstname}
					/>
					<div><small className="text-danger text-monospace">{firstnameAlert}</small></div>

					<label htmlfor="lastname"></label>
					<input 
							placeHolder="Last Name"
							onChange={lastnameOnChangeHandler}
							type="text" 
							id="lastname" 
							className="form-control text-monospace"
							autoComplete="off"
							value={lastname}
					/>
					<div><small className="text-danger text-monospace">{lastnameAlert}</small></div>

					<label htmlfor="address"></label>
					<input 
							placeHolder="Address"
							onChange={addressOnChangeHandler}
							type="text" 
							id="address" 
							className="form-control text-monospace"
							autoComplete="off"
							value={address}
					/>
					<div><small className="text-danger text-monospace">{addressAlert}</small></div>

					<label htmlfor="email"></label>
					<input 
							placeHolder="Email"
							onChange={emailOnChangeHandler}
							type="text" 
							id="email" 
							className="form-control text-monospace"
							autoComplete="off"
							value={email}
					/>
					<div><small className="text-danger text-monospace">{emailAlert}</small></div>

					<label htmlfor="username"></label>
					<input 
							placeHolder="Username"
							onChange={usernameOnChangeHandler}
							type="text" 
							id="usernameCreateAcct" 
							className="form-control text-monospace"
							autoComplete="off"
							value={username}
					/>
					<div><small className="text-danger text-monospace">{usernameAlert}</small></div>

					<label htmlfor="password"></label>
					<input 
							placeHolder="Password"
							onChange={passwordOnChangeHandler}
							type="password" 
							id="passwordCreateAcct" 
							className="form-control text-monospace"
							autoComplete="off"
							value={password}
					/>
					<div><small className="text-danger text-monospace">{passwordAlert}</small></div>

					<label htmlfor="confirmpw"></label>
					<input 
							placeHolder="Confirm Password"
							onChange={confirmpwOnChangeHandler}
							type="password" 
							id="confirmpw" 
							className="form-control text-monospace"
							autoComplete="off"
							value={confirmpw}
					/>
					<div><small className="text-danger text-monospace">{confirmpwAlert}</small></div>
					<div className="d-flex justify-content-center">
						<div className="form-group text-monospace">
						Choose:
						<select className="form-control" onChange={roleChangeHandler}>
							<option></option>
							{displayRoleOptions()}
						</select>
						</div>
						<div className="form-group text-monospace">
							Staff Only:
							<input 
								placeHolder="Enter Staff Password"
								onChange={staffpwOnChangeHandler}
								type="password" 
								id="staffpw" 
								className="form-control text-monospace text-right"
								autoComplete="off"
								value={staffpw}
							/>
						</div>	
						<div><small className="text-danger text-monospace text-right">{staffpwAlert}</small></div>
					</div>
					<button  disabled={disabledBtn} type="button" 
							id="registerBtn"
							onClick={registerClickHandler}
							className="btn btn-secondary mt-3 text-monospace"
					>
						Register
					</button>
					
					<div className="mt-3"><small className="text-monospace">Already have an account?
						<a href="http://localhost:3000/login" className="ml-2 text-success font-weight-bold"> 
						Login 
						</a></small></div>

				</form>
			</div>
		</div>

	);
}

export default CreateAccountField;