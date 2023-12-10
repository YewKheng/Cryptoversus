import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdHome, MdCurrencyBitcoin, MdCurrencyExchange } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export const Navbar = () => {
	const [toggle, setToggle] = useState(false);

	return (
		<nav className="flex w-full h-20 navbar-gradient justify-center items-center">
			<div className="flex w-full max-w-[1600px] justify-center items-center py-4 px-5 md:justify-between md:px-10">
				<button
					type="button"
					className="absolute left-5 top-7 text-white md:hidden"
					onClick={() => setToggle((prev) => !prev)}>
					{toggle ? <IoClose className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
				</button>
				<div className="flex items-center gap-1">
					<NavLink to="/">
						<img className="w-12 h-12" src="/crypto-icon.png" alt="Home Icon" />
					</NavLink>
					<NavLink to="/">
						<h1 className="text-gradient font-Mont text-2xl font-extrabold uppercase tracking-wide cursor-pointer">
							Cryptoversus
						</h1>
					</NavLink>
				</div>

				<ul className="hidden gap-5 md:flex lg:gap-10">
					<NavLink to="/" className="nav-link" activeClassName="active">
						<MdHome className="nav-icon" />
						Home
					</NavLink>
					<NavLink to="/cryptocurrencies" className="nav-link" activeClassName="active">
						<MdCurrencyBitcoin className="nav-icon" />
						Cryptocurrencies
					</NavLink>
					<NavLink to="/exchanges" className="nav-link" activeClassName="active">
						<MdCurrencyExchange className="nav-icon" />
						Exchanges
					</NavLink>
				</ul>

				<div
					className={`${
						toggle ? "top-[72px] left-0" : "-top-72 left-0"
					} absolute bg-[black]/80 shadow-md flex flex-col w-full items-center py-10 z-10 transition-all duration-300 md:hidden`}>
					<ul className="flex flex-col gap-5" onClick={() => setToggle((prev) => !prev)}>
						<NavLink to="/" className="nav-link" activeClassName="active">
							<MdHome className="nav-icon" />
							Home
						</NavLink>
						<NavLink to="/cryptocurrencies" className="nav-link" activeClassName="active">
							<MdCurrencyBitcoin className="nav-icon" />
							Cryptocurrencies
						</NavLink>
						<NavLink to="/exchanges" className="nav-link" activeClassName="active">
							<MdCurrencyExchange className="nav-icon" />
							Exchanges
						</NavLink>
					</ul>
				</div>
			</div>
		</nav>
	);
};
