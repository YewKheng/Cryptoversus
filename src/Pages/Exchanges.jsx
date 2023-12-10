import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import millify from "millify";

export const Exchanges = () => {
	const [exchanges, setExchanges] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);

			try {
				const response = await axios.get("https://api.coingecko.com/api/v3/exchanges?per_page=50");
				setExchanges(response.data);
				setFilteredData(response.data);
			} catch (error) {
				setError(error.message);
			}

			setLoading(false);
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (search === "") {
			setExchanges(filteredData);
		} else {
			const filteredData = exchanges.filter((exchange) =>
				exchange.name.toLowerCase().includes(search.toLowerCase())
			);
			setExchanges(filteredData);
		}
	}, [search]);

	if (loading) return <div className="text-white font-SS3 text-xl">Loading...</div>;
	if (error) return <div className="text-white font-SS3 text-xl">Error: {error}</div>;

	return (
		<div className="flex justify-center">
			<div className="w-full max-w-[1600px] py-5 px-5 md:px-10">
				<div className="flex w-full justify-center items-center pb-7">
					<div className="w-full h-[60px] bg-gradient rounded-[18px] p-[2px] sm:w-1/2 lg:w-1/3">
						<div className="flex w-full h-full justify-between items-center bg-[#171717] rounded-2xl">
							<input
								type="text"
								placeholder="Search Name"
								onChange={(event) => setSearch(event.target.value.toLowerCase())}
								className="bg-transparent pl-4 rounded-2xl text-white font-Mont text-base font-semibold tracking-wide outline-none placeholder:text-white/30 md:text-lg xxl:text-xl"
							/>
							<button type="button" className="pr-4">
								<IoSearch className="w-7 h-7 text-white cursor-pointer" />
							</button>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 grid-flow-row gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
					{exchanges.map((exchange) => (
						<Link
							to={exchange.url}
							target="_blank"
							key={exchange.id}
							className="hover:scale-110 transition duration-300">
							<div className="bg-[#171717] rounded-xl p-5">
								<div className="flex justify-between pb-7">
									<h2 className="text-white font-Mont text-lg font-semibold tracking-wide">
										{`${exchange.trust_score_rank}. ${exchange.name}`}
									</h2>
									<img src={exchange.image} alt="Exchange Logo" className="w-8 h-8" />
								</div>
								<div className="w-full h-[1px] bg-gradient" />
								<div className="flex flex-col gap-2 pt-7">
									<h4 className="card-content">
										Year Established:{" "}
										{exchange.year_established ? exchange.year_established : "Not Available"}
									</h4>
									<h4 className="card-content">Country: {exchange.country}</h4>
									<h4 className="card-content">Trust Score: {exchange.trust_score}</h4>
									<h4 className="card-content">
										Trade Vol 24h BTC: ${millify(exchange.trade_volume_24h_btc)}
									</h4>
									<h4 className="card-content">Click to open: {exchange.url}</h4>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};
