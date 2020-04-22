import react, { useState, useEffect, useRef } from "react";
import Today from "./Today";
import Tomorrow from "./Tomorrow";
import Daily from "./Daily";
import fetch from "isomorphic-unfetch";

const GetForecast = ({ zipCode }) => {
	const [view, setView] = useState("today");
	const [data, setData] = useState(null);
	const [cityName, setCityName] = useState(null);

	const [todayView, setTodayView] = useState("view selected");
	const [tomorrowView, setTomorrowView] = useState("view selected");
	const [fiveDayView, setFiveDayView] = useState("view selected");
	const [translation, setTranslation] = useState("translateX(0)");
	useEffect(() => {
		getData(zipCode);
	}, [zipCode]);

	useEffect(() => {
		if (view == "today") {
			setTodayView("view selected");
			setTomorrowView("view");
			setFiveDayView("view");
			setTranslation("translateX(0)");
		} else if (view == "tomorrow") {
			setTodayView("view");
			setTomorrowView("view selected");
			setFiveDayView("view");
			setTranslation("translateX(-100vw)");
		} else {
			setTodayView("view");
			setTomorrowView("view");
			setFiveDayView("view selected");
			setTranslation("translateX(-200vw)");
		}
	}, [view]);

	const getData = async (zipCode) => {
		console.log(process.env.OWM_API_KEY);
		if (zipCode.length >= 5) {
			let req = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=c7f5c9c231892d927a5ffe42d2207c61`
			);
			let resp = await req.json();
			setCityName(resp.name);
			req = await fetch(
				`https://api.openweathermap.org/data/2.5/onecall?lat=${resp.coord.lat}&lon=${resp.coord.lon}&appid=c7f5c9c231892d927a5ffe42d2207c61`
			);
			resp = await req.json();
			setData(resp);
		}
	};

	return (
		<>
			<div className="nav">
				<div className={todayView} onClick={() => setView("today")}>
					<p>Today</p>
				</div>
				<div className={tomorrowView} onClick={() => setView("tomorrow")}>
					<p>Tomorrow</p>
				</div>
				<div className={fiveDayView} onClick={() => setView("fiveday")}>
					<p>5 Day</p>
				</div>
			</div>
			{data && (
				<div className="theView">
					<Today view={view} data={data} name={cityName} />
					<Tomorrow view={view} data={data} name={cityName} />
					<Daily view={view} data={data} name={cityName} />
				</div>
			)}
			<style jsx>{`
				.nav {
					display: flex;
					flex-wrap: nowrap;
					background-color: rgba(0, 0, 0, 0.6);
				}
				.view {
					width: 33%;
					text-align: center;
					color: rgba(255, 255, 255, 0.4);
					text-transform: uppercase;
					cursor: pointer;
					border-bottom: 3px solid rgba(255, 255, 255, 0);
					transition: 0.3s all;
				}
				.selected {
					color: #fff;
					border-bottom: 3px solid #fff;
				}
				.theView {
					width: 300vw;
					display: flex;
					flex-wrap: nowrap;
					overflow: hidden;
					transform: ${translation};
					transition: 0.6s all;
					height: 85vh;
				}
			`}</style>
		</>
	);
};
// GetForecast.getInitialProps = ({zipCode}) => {

// };
export default GetForecast;
