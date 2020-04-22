import react, { useState, useEffect } from "react";
import HourlyGraph from "./HourlyGraph";

const Tomorrow = ({ view, data, name }) => {
	const [scaled, setScaled] = useState(1.1);
	const [bgColor, setBgColor] = useState("#fff");
	useEffect(() => {
		const interval = setInterval(() => {
			if (scaled == 0.9) {
				setScaled(1.1);
			} else {
				setScaled(0.9);
			}
		}, 2000);

		return () => clearInterval(interval);
	}, [scaled]);

	useEffect(() => {
		let icon = data.daily[1].weather[0].icon;
		if (icon.includes("d")) {
			setBgColor("#5FE6FF");
		} else {
			setBgColor("#3F3075");
		}
	}, [data]);

	var sec = data.daily[1].dt;
	var date = new Date(sec * 1000);
	var timestr = date.toLocaleTimeString();
	// console.log(timestr);

	return (
		<>
			<div className="view">
				<h2>{name}</h2>

				<div className="card">
					<div className="left">
						<p className="highlow low">
							Low
							{Math.trunc(((data.daily[1].temp.min - 273.15) * 9) / 5 + 32)}°F
						</p>
						<p className="highlow high">
							High
							{Math.trunc(((data.daily[1].temp.max - 273.15) * 9) / 5 + 32)}°F
						</p>
						<p className="current-temp">
							{Math.trunc(((data.daily[1].temp.day - 273.15) * 9) / 5 + 32)}°F
						</p>
						<p className="feels-like">
							Feels like{" "}
							{Math.trunc(((data.daily[1].feels_like - 273.15) * 9) / 5 + 32)}
							°F
						</p>
					</div>
					<div className="right">
						<img
							src={`http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png`}
						/>
						<p>{data.daily[1].weather[0].description}</p>
					</div>
				</div>
				<HourlyGraph data={data} day={"tomorrow"} />
			</div>
			<style jsx>{`
				h2 {
					text-align: center;
					color: #fff;
					text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
				}
				.view {
					display: flex;
					flex-direction: Column;
					width: 100vw;
				}
				.card {
					// box-shadow: 0px 2px 8px 7px rgba(0, 0, 0, 0.3);
					display: grid;
					grid-column-gap: 1em; /* horizontal gap between articles */
					grid-template-columns: repeat(2, 1fr);
					width: 90%;

					left: 0;
					right: 0;
					margin: auto;
				}
				.left,
				.right {
					width: 100%;
					padding: 15px;
					color: #fff;
					text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
				}
				.left {
					display: flex;
					flex-wrap: wrap;
				}
				.right {
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
					align-items: center;
				}
				.highlow {
					width: 40%;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-wrap: nowrap;
					margin: 15px 0;
				}
				.feels-like {
					width: 100%;
				}
				.low :global(svg) {
					color: red;
				}

				.high :global(svg) {
					color: green;
				}
				.current-temp {
					font-size: 102px;
					margin: 0;
				}
				img {
					transition: 2s all;
					transform: scale(${scaled});
				}
			`}</style>
		</>
	);
};

export default Tomorrow;
