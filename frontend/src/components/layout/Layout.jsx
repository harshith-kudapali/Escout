import Navbar from "./Navbar";

const Layout = ({ children }) => {
	return (
		<div className='min-h-screen bg-base-100'>
			<Navbar />
			<main className='max-w-7xl mx-auto px-2 py-4'>{children}</main>
		</div>
	);
};
export default Layout;
