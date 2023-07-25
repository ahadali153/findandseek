import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";

const SignupForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const { register } = useToken();
	const navigate = useNavigate();

	const handleRegistration = (e) => {
		e.preventDefault();
		const accountData = {
			username: username,
			password: password,
			email: email,
		};
		register(accountData, `${process.env.REACT_APP_API_HOST}/accounts`);
		e.target.reset();
		navigate("/signup");
	};

	return (
		<div className="card text-bg-light mb-3">
			<h5 className="card-header">Signup</h5>
			<div className="card-body">
				<form onSubmit={(e) => handleRegistration(e)}>
					<div className="mb-3">
						<label className="form-label">Email:</label>
						<input
							name="email"
							type="text"
							className="form-control"
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</div>
					<div className="mb-3">
						<label className="form-label">Username:</label>
						<input
							name="username"
							type="text"
							className="form-control"
							onChange={(e) => {
								setUsername(e.target.value);
							}}
						/>
					</div>
					<div className="mb-3">
						<label className="form-label">Password:</label>
						<input
							name="password"
							type="password"
							className="form-control"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</div>
					<div>
						<input className="btn btn-primary" type="submit" value="Register" />
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignupForm;
