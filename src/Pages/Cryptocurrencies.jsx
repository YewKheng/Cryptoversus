import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import millify from "millify";

export const Cryptocurrencies = () => {
	const [currencies, setCurrencies] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);

			try {
				const response = await axios.get(
					"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
				);
				setCurrencies(response.data);
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
			setCurrencies(filteredData);
		} else {
			const filteredData = currencies.filter((currency) =>
				currency.name.toLowerCase().includes(search.toLowerCase())
			);
			setCurrencies(filteredData);
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
					{currencies.map((currency) => (
						<Link
							to={`/crypto/${currency.id}`}
							key={currency.id}
							className="hover:scale-110 transition duration-300">
							<div className="bg-[#171717] rounded-xl p-5">
								<div className="flex justify-between pb-7">
									<h2 className="text-white font-Mont text-lg font-semibold tracking-wide">{`${currency.market_cap_rank}. ${currency.name}`}</h2>
									<img src={currency.image} alt="Crypto Logo" className="w-8 h-8" />
								</div>
								<div className="w-full h-[1px] bg-gradient" />
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
			</div>
		</div>
	);
};
