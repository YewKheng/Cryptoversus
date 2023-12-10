import { useEffect, useState } from "react";
import axios from "axios";
import millify from "millify";

export const Hero = () => {
	const [globalStats, setGlobalStats] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);

			try {
				const response = await axios.get("https://api.coingecko.com/api/v3/global");
				setGlobalStats(response.data);
			} catch (error) {
				setError(error.message);
			}

			setLoading(false);
		};

		fetchData();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<>
			<div className="grid grid-cols-2 grid-flow-row gap-7 pb-5">
				<div>
					<h3 className="stats-title">Total Cryptocurrencies</h3>
					<p className="stats-value">{globalStats.data.active_cryptocurrencies.toLocaleString()}</p>
				</div>
				<div>
					<h3 className="stats-title">Total Market Cap</h3>
					<p className="stats-value">$ {millify(globalStats.data.total_market_cap.usd)}</p>
				</div>
				<div>
					<h3 className="stats-title">Dominance</h3>
					<p className="stats-value">BTC {millify(globalStats.data.market_cap_percentage.btc)}%</p>
					<p className="stats-value">ETH {millify(globalStats.data.market_cap_percentage.eth)}%</p>
				</div>
				<div>
					<h3 className="stats-title">Total 24h Volume</h3>
					<p className="stats-value">$ {millify(globalStats.data.total_volume.usd)}</p>
				</div>
				<div>
					<h3 className="stats-title">Total Markets</h3>
					<p className="stats-value">{globalStats.data.markets}</p>
				</div>
			</div>
		</>
	);
};
