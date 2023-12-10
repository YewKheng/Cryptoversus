import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import millify from "millify";

export const CryptoCard = () => {
	const [topCrypto, setTopCrypto] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);

			try {
				const response = await axios.get(
					"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en"
				);
				setTopCrypto(response.data);
			} catch (error) {
				setError(error.message);
			}

			setLoading(false);
		};

		fetchData();
	}, []);

	if (loading) return <div className="text-white font-SS3 text-xl">Loading...</div>;
	if (error) return <div className="text-white font-SS3 text-xl">Error: {error}</div>;

	return (
		<>
			<div className="grid grid-cols-1 grid-flow-row gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
				{topCrypto.map((currency) => (
					<Link
						to={`/crypto/${currency.id}`}
						key={currency.id}
						className="hover:scale-110 transition duration-300">
						<div className="bg-[#171717] rounded-xl p-5">
							<div className="flex justify-between pb-7">
								<h2 className="text-white font-Mont text-lg font-semibold tracking-wide">{`${currency.market_cap_rank}. ${currency.name}`}</h2>
								<img src={currency.image} alt="Crypto Logo" className="w-8 h-8" />
							</div>
							<div className="w-full h-[1px] bg-gradient-to-r from-[#1a6dff] to-[#c822ff]" />
							<div className="flex flex-col gap-2 pt-7">
								<h4 className="card-content">Price: ${millify(currency.current_price)}</h4>
								<h4 className="card-content">
									Daily Change: {millify(currency.price_change_percentage_24h)}%
								</h4>
								<h4 className="card-content">24h Volume: ${millify(currency.total_volume)}</h4>
								<h4 className="card-content">Market Cap: ${millify(currency.market_cap)}</h4>
							</div>
						</div>
					</Link>
				))}
			</div>
		</>
	);
};
