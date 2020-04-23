import react, { useState, useEffect } from "react";

const Tomorrow = ({ view, data, name }) => {
	const [daily, setDaily] = useState(null);
	useEffect(() => {
		const days = [];
		data.daily.splice(0, 5).map((day) => {
			console.log(day);
			var sec = day.dt;
			var date = new Date(sec * 1000);
			var stringDate = date.toString();
			stringDate = stringDate.split("2020")[0];
			var timestr = date.toLocaleTimeString();
			console.log(date);
			days.push({
				time: stringDate,
				degs: Math.trunc(((day.temp - 273.15) * 9) / 5 + 32),
				icon: day.weather[0].icon,
				description: day.weather[0].description,
			});
			setDaily(days);
		});
	}, [data]);

	var sec = data.daily[1].dt;
	var date = new Date(sec * 1000);
	var timestr = date.toLocaleTimeString();
	// console.log(timestr);
	console.log(data);

	return (
		<>
			<div className="view">
				{daily &&
					daily.map((day) => {
						return (
							<div className="day">
								<div className="wrap">
									<div className="left">
										<p>{day.time}</p>
										<p>{day.description}</p>
									</div>
									<div className="right">
										<img
											src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
										/>
									</div>
								</div>
							</div>
						);
					})}
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
					height: 85vh;
				}
				.day {
					display: flex;
					width: 100%;
					background-color: #fff;
					color: #333;
					left: 0;
					right: 0;
					margin: auto;
					height: 20%;
					border-bottom: 1px solid rgba(0, 0, 0, 0.1);
					height: 20%;
				}
				.day:last-of-type {
					border-bottom: 1px solid #fff;
				}
				.wrap {
					max-width: 900px;
					left: 0;
					right: 0;
					margin: auto;
					width: 100%;
					display: flex;
					height: 100%;
				}
				.left > p {
					margin: 5px;
					text-shadow: unset;
				}
				.left,
				.right {
					width: 50%;
					padding: 15px;
					color: #333;
					text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}
				.left {
					align-items: flex-start;
				}
				@media (min-width: 768px) {
					.right {
						align-items: flex-end;
					}
				}
			`}</style>
		</>
	);
};

export default Tomorrow;
