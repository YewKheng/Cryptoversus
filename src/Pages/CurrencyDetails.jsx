import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import axios from "axios";
import millify from "millify";

export const CurrencyDetails = () => {
	const [currency, setCurrency] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const { coinId } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);

			try {
				const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
				setCurrency(response.data);
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
		<div className="flex justify-center">
			<div className="w-full max-w-[1600px] py-5 px-5 md:px-10">
				<div className="flex flex-col items-center pb-5 md:items-start">
					<div className="pb-3">
						<div className="bg-gradient w-fit h-fit py-[5px] px-2 rounded-md">
							<h5 className="text-white font-SS3 text-base leading-5 font-semibold">
								Rank: <span>{currency.market_cap_rank}</span>
							</h5>
						</div>
					</div>
					<div className="flex items-center gap-3 pb-3">
						<img src={currency.image.small} alt="Crypto Logo" />
						<h3 className="text-white font-Mont text-2xl font-bold tracking-wide lg:text-3xl xl:text-4xl">
							{currency.name}
						</h3>
						<p className="text-gray-400 font-Mont text-2xl uppercase lg:text-3xl xl:text-4xl">
							{currency.symbol}
						</p>
						<p className="text-gray-400 font-Mont text-2xl  lg:text-3xl xl:text-4xl">Price</p>
					</div>
					<p className="text-white font-SS3 text-4xl font-semibold lg:text-5xl">
						${currency.market_data.current_price.usd.toLocaleString()}
					</p>
				</div>

				<div className="grid w-full grid-cols-2 grid-flow-row gap-5 py-6 place-items-center text-center md:place-items-start md:text-start md:gap-x-20 lg:gap-x-40 xl:gap-x-60 xxl:gap-x-80">
					<div className="market-details border-[#1b1b1b]">
						<h3 className="stats-title">Market Cap</h3>
						<p className="stats-value">${currency.market_data.market_cap.usd.toLocaleString()}</p>
					</div>
					<div className="market-details border-[#1b1b1b]">
						<h3 className="stats-title">Circulating Supply</h3>
						<p className="stats-value">
							{currency.market_data.circulating_supply.toLocaleString()}
						</p>
					</div>
					<div className="market-details border-[#1b1b1b]">
						<h3 className="stats-title">24 Hour Volume</h3>
						<p className="stats-value">${currency.market_data.total_volume.usd.toLocaleString()}</p>
					</div>
					<div className="market-details border-[#1b1b1b]">
						<h3 className="stats-title">Total Supply</h3>
						<p className="stats-value">{currency.market_data.total_supply.toLocaleString()}</p>
					</div>
					<div className="market-details border-[#1b1b1b]">
						<h3 className="stats-title">Fully Diluted Valuation</h3>
						<p className="stats-value">
							${currency.market_data.fully_diluted_valuation.usd.toLocaleString()}
						</p>
					</div>
					<div className="market-details border-[#1b1b1b]">
						<h3 className="stats-title">Max Supply</h3>
						<p className="stats-value">
							{currency.market_data.max_supply
								? currency.market_data.max_supply.toLocaleString()
								: "Not Available"}
						</p>
					</div>
				</div>

				<div className="flex justify-center text-center py-5">
					<h1 className="text-white font-Mont text-2xl font-bold lg:text-3xl xl:text-4xl">
						{currency.name} Price Change Percentage in USD
						<div className="bg-gradient w-full h-[2px]" />
					</h1>
				</div>
				<div className="grid w-full grid-cols-3 grid-flow-row gap-y-6 pb-6 place-items-center text-center md:grid-cols-6">
					<div className="w-full border-t-2 border-t-[#1b1b1b] border-l-2 border-l-[#1b1b1b] border-b-2 border-b-[#1b1b1b]">
						<h3 className="percentage-title border-b-2 border-[#1b1b1b]">1h</h3>
						<p
							className={
								`${currency.market_data.price_change_percentage_1h_in_currency.usd}` < 0
									? "text-red-500 percentage-change"
									: "text-green-500 percentage-change"
							}>
							{millify(currency.market_data.price_change_percentage_1h_in_currency.usd)}%
						</p>
					</div>
					<div className="w-full border-2 border-[#1b1b1b]">
						<h3 className="percentage-title border-b-2 border-[#1b1b1b]">24h</h3>
						<p
							className={
								`${currency.market_data.price_change_percentage_24h_in_currency.usd}` < 0
									? "text-red-500 percentage-change"
									: "text-green-500 percentage-change"
							}>
							{millify(currency.market_data.price_change_percentage_24h_in_currency.usd)}%
						</p>
					</div>
					<div className="w-full border-t-2 border-t-[#1b1b1b] border-r-2 border-r-[#1b1b1b] border-b-2 border-b-[#1b1b1b]">
						<h3 className="percentage-title border-b-2 border-[#1b1b1b]">7d</h3>
						<p
							className={
								`${currency.market_data.price_change_percentage_7d_in_currency.usd}` < 0
									? "text-red-500 percentage-change"
									: "text-green-500 percentage-change"
							}>
							{millify(currency.market_data.price_change_percentage_7d_in_currency.usd)}%
						</p>
					</div>
					<div className="w-full border-t-2 border-t-[#1b1b1b] border-l-2 border-l-[#1b1b1b] border-b-2 border-b-[#1b1b1b] md:border-l-0">
						<h3 className="percentage-title border-b-2 border-[#1b1b1b]">14d</h3>
						<p
							className={
								`${currency.market_data.price_change_percentage_14d_in_currency.usd}` < 0
									? "text-red-500 percentage-change"
									: "text-green-500 percentage-change"
							}>
							{millify(currency.market_data.price_change_percentage_14d_in_currency.usd)}%
						</p>
					</div>
					<div className="w-full border-2 border-[#1b1b1b]">
						<h3 className="percentage-title border-b-2 border-[#1b1b1b]">30d</h3>
						<p
							className={
								`${currency.market_data.price_change_percentage_30d_in_currency.usd}` < 0
									? "text-red-500 percentage-change"
									: "text-green-500 percentage-change"
							}>
							{millify(currency.market_data.price_change_percentage_30d_in_currency.usd)}%
						</p>
					</div>
					<div className="w-full border-t-2 border-t-[#1b1b1b] border-r-2 border-r-[#1b1b1b] border-b-2 border-b-[#1b1b1b]">
						<h3 className="percentage-title border-b-2 border-[#1b1b1b]">1y</h3>
						<p
							className={
								`${currency.market_data.price_change_percentage_1y_in_currency.usd}` < 0
									? "text-red-500 percentage-change"
									: "text-green-500 percentage-change"
							}>
							{millify(currency.market_data.price_change_percentage_1y_in_currency.usd)}%
						</p>
					</div>
				</div>

				<div className="flex flex-col-reverse justify-center items-center gap-10 py-5 md:flex-row md:items-start">
					<div className="flex flex-col flex-1 items-center md:items-start md:pt-5">
						<h1 className="text-white font-Mont text-2xl font-bold pb-5 lg:text-3xl xl:text-4xl">
							What is {currency.name}?
							<div className="bg-gradient w-full h-[2px]" />
						</h1>
						<p
							className="text-white font-Mont text-sm font-normal text-center md:text-base md:text-start xl:text-lg
					xxl:text-xl">
							{HTMLReactParser(currency.description.en)}
						</p>
					</div>
					<div className="flex w-3/4 flex-col bg-[#1b1b1b] p-5 rounded-2xl md:w-fit lg:w-[450px] xl:w-[500px]">
						<div className="flex justify-center text-center lg:justify-start lg:text-start">
							<h1 className="text-white font-Mont text-2xl font-bold tracking-wide pb-5 lg:text-3xl xl:text-4xl">
								<span className="uppercase">{currency.symbol}</span> Price Statistics
								<div className="bg-gradient w-full h-[2px]" />
							</h1>
						</div>
						<div className="grid w-full grid-cols-1 grid-flow-row place-items-center text-center gap-y-6 lg:place-items-start lg:text-start ">
							<div className="statistics">
								<h3 className="stats-title">Market Cap Rank</h3>
								<p className="stats-value">#{currency.market_cap_rank}</p>
							</div>
							<div className="statistics">
								<h3 className="stats-title">{currency.name} Price</h3>
								<p className="stats-value">
									${currency.market_data.current_price.usd.toLocaleString()}
								</p>
							</div>
							<div className="statistics">
								<h3 className="stats-title">24h Low / 24h High</h3>
								<p className="stats-value">
									${currency.market_data.low_24h.usd.toLocaleString()} / $
									{currency.market_data.high_24h.usd.toLocaleString()}
								</p>
							</div>
							<div className="statistics">
								<h3 className="stats-title">Trading Volume</h3>
								<p className="stats-value">
									${currency.market_data.total_volume.usd.toLocaleString()}
								</p>
							</div>
							<div className="statistics">
								<h3 className="stats-title">Market Cap</h3>
								<p className="stats-value">
									${currency.market_data.market_cap.usd.toLocaleString()}
								</p>
							</div>
							<div className="statistics">
								<h3 className="stats-title">Volume / Market Cap</h3>
								<p className="stats-value">
									{(
										currency.market_data.total_volume.usd / currency.market_data.market_cap.usd
									).toFixed(4)}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
