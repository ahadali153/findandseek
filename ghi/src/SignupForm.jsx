import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";

const SignupForm = ({ handleSignup }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [reenterPassword, setReenterPassword] = useState("");
	const { register } = useToken();
	const navigate = useNavigate();
	const { login } = useToken();

	const handleRegistration = async (e) => {
		e.preventDefault();
		if (password !== reenterPassword) {
			alert("Password and Re-entered Password must match!");
			return;
		}
		const accountData = {
			username: username,
			password: password,
			email: email,
		};
		try {
			await register(accountData, `${process.env.REACT_APP_API_HOST}/accounts`);
			login(username, password).then(() => {
				handleSignup();
			});
			e.target.reset();
			// navigate("/");
		} catch (error) {
			console.error("Error during registration:", error);
		}
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
								setEmail(e.target.value.toLowerCase());
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
					<div className="mb-3">
						<label className="form-label">Re-enter Password:</label>
						<input
							name="reenterPassword"
							type="password"
							className="form-control"
							onChange={(e) => {
								setReenterPassword(e.target.value);
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
