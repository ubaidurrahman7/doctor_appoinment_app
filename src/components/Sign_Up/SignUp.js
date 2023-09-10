import React, { useEffect, useState } from 'react';
import './Sign_Up.css'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState({ messages: [], timer: null });
    const navigate = useNavigate();

    const hideErrorMessages = () => {
        setShowerr({ messages: [], timer: null });
    };


    const register = async (e) => {
        e.preventDefault();
        
        // API Call
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });
        const json = await response.json();
        console.log('Response:', json);
        if (json.authtoken) {
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            // phone and email
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            // Redirect to home page
            navigate("/");   //on directing to home page you need to give logic to change login and signup buttons with name of the user and logout button where you have implemented Navbar functionality
            window.location.reload();
        } else {
            // Registration failed, handle the error(s)
            if (json.error && json.error.length > 0) {
                const errorMessages = json.error.map((errorItem) => errorItem.msg);
                console.error("Error Messages:", errorMessages); // Debugging line
                // Update the showerr state with the array of error messages
                setShowerr({
                    messages: errorMessages,
                    timer: setTimeout(hideErrorMessages, 10000) // 10 seconds
                });
            } else {
                // Handle unexpected error response with no error messages
                console.error("Registration failed with an unknown error.");
            }
        }
        
    };
    useEffect(() => {
        // Clear the timer when the component unmounts
        return () => {
            if (showerr.timer) {
                clearTimeout(showerr.timer);
            }
        };
    }, [showerr]);

  return (
      <div className="container">
        <div className="signup-grid">
            <div className="signup-text">
                <h1>Sign Up</h1>

            </div>
            <div className="signup-text1" style={{textAlign: " left"}}>
                Already a member? <span><Link to="/login" style={{color: "#2190FF"}}> Login</Link></span>
            </div>
            <div className="signup-form">
                <form method="POST" onSubmit={register}>

                <div className="form-group">
                {showerr.messages.length > 0 && (
    <div className="err" style={{ color: 'red' }}>
    <ul>
        {showerr.messages.map((errorMessage, index) => (
        <div style={{ marginBottom:'15px' , marginLeft:'-25px', border:'2px solid red' }}>
            <li key={index} style={{ marginLeft: '15px' }}>{errorMessage}</li>
            <div
            className="error-line"
            style={{ animationDuration: '10s', marginBottom: '5px', marginLeft: '20px' }}
        ></div></div>
        
        ))}
    </ul>
</div>
)}
                            <label htmlFor="name">Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="form-control" placeholder="Enter your name" aria-describedby="helpId" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" name="phone" id="phone" className="form-control" placeholder="Enter your phone number" aria-describedby="helpId" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="helpId" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="form-control" placeholder="Enter your password" aria-describedby="helpId" />
                        </div>
                    <div className="btn-group">
                        <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button>
                        <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignUp