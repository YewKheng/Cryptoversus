import { Link } from "react-router-dom";
import { Hero, CryptoCard } from "../Components";

export const Home = () => {
	return (
		<div className="flex justify-center">
			<div className="w-full max-w-[1600px] py-5 px-5 md:px-10">
				<div className="pb-5">
					<h2 className="text-white font-Mont text-2xl font-bold sm:text-4xl xxl:text-6xl">
						Global Crypto Stats
					</h2>
				</div>
				<Hero />

				<div className="bg-gradient w-full h-[2px]" />

				<div className="flex flex-col justify-between items-start pt-5 pb-7">
					<h2 className="text-white font-Mont text-2xl font-bold sm:text-3xl md:text-4xl xxl:text-6xl">
						Top 10 Cryptocurrencies in the world
					</h2>
					<Link to="/cryptocurrencies" className="show-more">
						Show More Currencies
					</Link>
				</div>
				<CryptoCard />
			</div>
		</div>
	);
};
