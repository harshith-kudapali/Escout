import { Link } from "react-router-dom";

function UserCard({ user, isConnection }) {
	return (
		<div className='bg-secondary border-4 border-neutral rounded-lg shadow p-4 flex flex-col items-center transition-all hover:shadow-md'>
			<Link to={`/profile/${user.username}`} className='flex flex-col items-center'>
				<img
					src={user.profilePicture || "/avatar.png"}
					alt={user.name}
					className='w-24 h-24 rounded-full object-cover mb-4'
				/>
				<h3 className='font-semibold text-lg text-center'>{user.name}</h3>
			</Link>
			<p className='text-gray-400 text-center'>FragNation user</p>
			<p className='text-sm text-gray-400 mt-2'>{user.connections?.length} Allies</p>
			<button className='mt-4 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors w-full'>
				{isConnection ? "Connected" : "Connect"}
			</button>
		</div>
	);
}

export default UserCard;
