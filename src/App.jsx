import { Route, Routes } from "react-router-dom";
import { Navbar, Footer } from "./Components";
import { Home, Cryptocurrencies, Exchanges, CurrencyDetails } from "./Pages";

export const App = () => {
	return (
		<>
			<nav>
				<Navbar />
			</nav>
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
					<Route path="/exchanges" element={<Exchanges />} />
					<Route path="/crypto/:coinId" element={<CurrencyDetails />} />
				</Routes>
			</main>
			<footer>
				<Footer />
			</footer>
		</>
	);
};
