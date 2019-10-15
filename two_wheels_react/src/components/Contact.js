import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

function Contact() {
		
	return(

		<div class="container-fluid container-contact p-5">
		  <div className="text-center">
		    <h2>Contact Us</h2>
		    <p>Swing by and view our bikes, or leave us a message:</p>
		  </div>
		  <div class="row row-contact d-flex justify-content-around">
		    <div class="column-contact">
		      <iframe id="gmap" src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.7312593565753!2d121.03125941397181!3d14.557354689830028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9b8d33b2c6d%3A0xb0c2f766338a92bd!2sZuitt+Makati!5e0!3m2!1sen!2sph!4v1562227985324!5m2!1sen!2sph"} allowfullscreen></iframe>
		    </div>
		    <div class="column-contact">
		      <form action="/action_page.php">
		        <label for="fname">First Name</label>
		        <input type="text" id="fname" name="firstname" placeholder="Your name.."/>
		        <label for="lname">Last Name</label>
		        <input type="text" id="lname" name="lastname" placeholder="Your last name.."/>
		        <label for="subject">Subject</label>
		        <textarea id="subject" name="subject" placeholder="Write something.." style={{height:"170px"}}></textarea>
		       <Link to="/">
		        <input id="submit" type="submit" value="Submit"/>
		        </Link>
		      </form>
		    </div>
		  </div>
		</div>
	);
}

export default Contact;