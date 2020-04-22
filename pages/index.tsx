import react, { useState, useEffect } from "react";
import GetForecast from "../components/GetForecast";
import Head from "next/head";
// import { GoSearch } from "react-icons/Go";

const Home = () => {
	console.log(process.env.OWM_API_KEY);
	const [zipCode, setZipCode] = useState("07601");
	const [bool, setBool] = useState(true);

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			setBool(true);
		}
	};
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			{bool ? (
				<>
					<div className="header">
						<input
							tabIndex={1}
							onChange={(e) => setZipCode(e.target.value)}
							onKeyDown={(e) => handleKeyDown(e)}
							value={zipCode}
						></input>
					</div>
					<GetForecast zipCode={zipCode} />
				</>
			) : (
				<>
					<div className="header">
						<input
							tabIndex={1}
							onChange={(e) => setZipCode(e.target.value)}
							onKeyDown={(e) => handleKeyDown(e)}
							placeholder="Enter your zipcode"
						></input>
					</div>
				</>
			)}
			<style jsx>{`
				@font-face {
					font-family: "Product Sans Regular";
					src: url("/fonts/product-sans/productsansregular.ttf");
				}
				:global(*) {
					font-family: "Product Sans Regular", sans-serif;
				}

				.header {
					background: rgba(0, 0, 0, 0.6);
					display: flex;
					flex-direction: column;
					justify-content: center;
				}
				input {
					width: 90%;
					left: 0;
					right: 0;
					margin: 5px auto;
					margin-top: 15px;
					display: block;
					height: 50px;
					border-radius: 2px;
					border: none;
					box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
					text-align: center;
					font-size: 18px;
				}
			`}</style>
		</>
	);
};

export default Home;
