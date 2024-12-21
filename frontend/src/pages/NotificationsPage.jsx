import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { ExternalLink, Eye, MessageSquare, ThumbsUp, Trash2, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { formatDistanceToNow } from "date-fns";

const NotificationsPage = () => {
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

	const queryClient = useQueryClient();

	const { data: notifications, isLoading } = useQuery({
		queryKey: ["notifications"],
		queryFn: () => axiosInstance.get("/notifications"),
	});

	const { mutate: markAsReadMutation } = useMutation({
		mutationFn: (id) => axiosInstance.put(`/notifications/${id}/read`),
		onSuccess: () => {
			queryClient.invalidateQueries(["notifications"]);
		},
	});

	const { mutate: deleteNotificationMutation } = useMutation({
		mutationFn: (id) => axiosInstance.delete(`/notifications/${id}`),
		onSuccess: () => {
			queryClient.invalidateQueries(["notifications"]);
			toast.success("Notification deleted");
		},
	});

	const renderNotificationIcon = (type) => {
		switch (type) {
			case "like":
				return <ThumbsUp className='text-blue-500 ' />;

			case "comment":
				return <MessageSquare className='text-green-500' />;
			case "connectionAccepted":
				return <UserPlus className='text-purple-500' />;
			default:
				return null;
		}
	};

	const renderNotificationContent = (notification) => {
		switch (notification.type) {
			case "like":
				return (
					<span>
						<strong>{notification.relatedUser.name}</strong> liked your post
					</span>
				);
			case "comment":
				return (
					<span>
						<Link to={`/profile/${notification.relatedUser.username}`} className='font-bold'>
							{notification.relatedUser.name}
						</Link>{" "}
						commented on your post
					</span>
				);
			case "connectionAccepted":
				return (
					<span>
						<Link to={`/profile/${notification.relatedUser.username}`} className='font-bold'>
							{notification.relatedUser.name}
						</Link>{" "}
						accepted your connection request
					</span>
				);
			default:
				return null;
		}
	};

	const renderRelatedPost = (relatedPost) => {
		if (!relatedPost) return null;

		return (
			<Link
				to={`/post/${relatedPost._id}`}
				className='mt-2 p-2 bg-secondary rounded-md block hover:bg-gray-600 transition-colors'
			>
				{relatedPost.image && (
					<img
						src={relatedPost.image}
						alt='Post preview'
						className='w-full h-auto object-cover rounded mb-2'
					/>
				)}
				<p className='text-sm text-neutral'>{relatedPost.content}</p>
				<div className='flex items-center gap-2 mt-2 text-sm text-blue-500'>
					<ExternalLink size={14} className='text-blue-500' />
					View Full Post
				</div>
			</Link>
		);
	};

	return (
		<div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
			<div className='col-span-1 lg:col-span-1'>
				<Sidebar user={authUser} />
			</div>
			<div className='col-span-1 lg:col-span-3'>
				<div className='bg-secondary rounded-lg shadow p-6'>
					<h1 className='text-2xl font-bold mb-6 text-primary'>Notifications</h1>

					{isLoading ? (
						<p>Loading notifications...</p>
					) : notifications && notifications.data.length > 0 ? (
						<ul>
							{notifications.data.map((notification) => (
								<li
									key={notification._id}
									className={`bg-secondary border rounded-lg p-4 my-4 transition-all hover:shadow-md ${
										!notification.read ? "border-blue-500" : "border-gray-200"
									}`}
								>
									<div className='flex flex-col gap-4'>
										<div className='flex items-start gap-4'>
											<Link to={`/profile/${notification.relatedUser.username}`}>
												<img
													src={notification.relatedUser.profilePicture || "/avatar.png"}
													alt={notification.relatedUser.name}
													className='w-12 h-12 rounded-full object-cover'
												/>
											</Link>

											<div>
												<div className='flex items-center gap-2'>
													<div className='p-1 bg-gray-100 rounded-full'>
														{renderNotificationIcon(notification.type)}
													</div>
													<p className='text-sm'>{renderNotificationContent(notification)}</p>
												</div>
												<p className='text-xs text-gray-500 mt-1'>
													{formatDistanceToNow(new Date(notification.createdAt), {
														addSuffix: true,
													})}
												</p>
											</div>
										</div>

										{renderRelatedPost(notification.relatedPost)}

										<div className='flex justify-end gap-2'>
											{!notification.read && (
												<button
													onClick={() => markAsReadMutation(notification._id)}
													className='px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors'
													aria-label='Mark as read'
												>
													Mark as Read
												</button>
											)}
											<button
												onClick={() => deleteNotificationMutation(notification._id)}
												className='px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors'
												aria-label='Delete notification'
											>
												Delete
											</button>
										</div>
									</div>
								</li>
							))}
						</ul>
					) : (
						<p>No notifications at the moment.</p>
					)}
				</div>
			</div>
		</div>
	);
};
export default NotificationsPage;
