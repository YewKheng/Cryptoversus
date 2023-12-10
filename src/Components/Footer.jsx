export const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<div className="flex w-full justify-center items-end text-center px-5 pt-10 pb-5 md:px-10 xxl:pt-16">
			<p className="text-white font-SS3 text-base">
				Copyright &copy; {year} CRYPTOVERSUS. All Right Reserved.
			</p>
		</div>
	);
};
