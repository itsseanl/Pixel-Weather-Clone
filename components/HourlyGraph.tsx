import react, { useState, useEffect } from "react";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	AreaChart,
	Area,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { curveCardinal } from "d3-shape";

const HourlyGraph = ({ data, day }) => {
	const [graph, setGraph] = useState(null);
	const [icons, setIcons] = useState(null);
	useEffect(() => {
		const hourlyData = [];
		const icons = [];
		if (day == "today") {
			data.hourly.slice(0, 10).map((hour) => {
				var sec = hour.dt;
				var date = new Date(sec * 1000);
				var timestr = date.toLocaleTimeString();
				hourlyData.push({
					degs: Math.trunc(((hour.temp - 273.15) * 9) / 5 + 32),
					time: timestr.replace(":00:00", ""),
				});
			});
		} else {
			data.hourly.slice(10, 20).map((hour) => {
				var sec = hour.dt;
				var date = new Date(sec * 1000);
				var timestr = date.toLocaleTimeString();
				hourlyData.push({
					degs: Math.trunc(((hour.temp - 273.15) * 9) / 5 + 32),
					time: timestr.replace(":00:00", ""),
				});
			});
		}

		setGraph(hourlyData);
	}, [data]);

	const cardinal = curveCardinal.tension(3);

	return (
		<>
			<div className="hourly">
				<ResponsiveContainer>
					<AreaChart
						data={graph}
						margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
					>
						<defs>
							<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#fff" stopOpacity={0.8} />
								<stop offset="95%" stopColor="#fff" stopOpacity={0} />
							</linearGradient>
						</defs>
						<XAxis dataKey="time" interval={0} tick={{ fontSize: 9 }} />
						<Tooltip />
						<Area
							type="monotone"
							dataKey="degs"
							stroke="#rgba(0,0,0,0.6)"
							fillOpacity={1}
							fill="url(#colorUv)"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
			<style jsx>{`
				.hourly {
					width: 100%;
					height: 500px;
				}
			`}</style>
		</>
	);
};
export default HourlyGraph;
