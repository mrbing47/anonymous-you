import React, { useState } from "react";

import "./css/global.css";
import "./css/auth.css";
import google_logo from "./img/google-logo.png";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isHidden, setHidden] = useState(true);

	return (
		<div id="login-container">
			<form id="local-container" autoComplete="on">
				<div className="input-container">
					<input
						className="input-field"
						id="email"
						type="email"
						name="email"
						required
						placeholder="Email"
						autoFocus
						autoComplete="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor="email">Email</label>
				</div>
				<div className="input-container">
					<input
						className="input-field"
						id="password"
						type={isHidden ? "password" : "text"}
						name="password"
						required
						placeholder="Password"
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label htmlFor="password">Password</label>
					<span
						id="show-pass"
						data-content={isHidden ? "Show Password" : "Hide Password"}
						onClick={() => setHidden((state) => !state)}
						className={isHidden ? "" : "show-pass-line"}
					>
						P
					</span>
				</div>
				<input type="submit" id="sign-in" value="Sign In" />
			</form>

			<div id="google-container">
				<span>or Sign-In with:</span>
				<a href="/api/auth/google" id="google-btn">
					<img src={google_logo} alt="Google Logo" />
					<div id="google-login">Google</div>
				</a>
			</div>
		</div>
	);
}
