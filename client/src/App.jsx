import React, { useState, useEffect } from "react"
import Dashboard from "./components/Dashboard"

const App = () => {
	return (
		<section className="hero is-fullheight is-light">
			<div className="hero-head">
				<div className="container">
					<div className="tabs is-centered">
						<ul>
							<li>
								<a>PWA Games</a>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="hero-body">
				<div className="container">
					<header className="bd-index-header">
						<Dashboard />
					</header>
				</div>
			</div>

			<div className="hero-foot">
				<div className="container">
					<div className="tabs is-centered">
						<ul>
							<li>
								<a>Let's Rock!</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};

export default App;
