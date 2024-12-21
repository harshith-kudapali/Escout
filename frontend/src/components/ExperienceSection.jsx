import { Briefcase, X } from "lucide-react";
import { useState } from "react";
import { formatDate } from "../utils/dateUtils";
import { FaTeamspeak } from "react-icons/fa";

const ExperienceSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [experiences, setExperiences] = useState(userData.experience || []);
	const [newExperience, setNewExperience] = useState({
		title: "",
		company: "",
		startDate: "",
		endDate: "",
		description: "",
		currentlyWorking: false,
	});

	const handleAddExperience = () => {
		if (newExperience.title && newExperience.company && newExperience.startDate) {
			setExperiences([...experiences, newExperience]);

			setNewExperience({
				title: "",
				company: "",
				startDate: "",
				endDate: "",
				description: "",
				currentlyWorking: false,
			});
		}
	};

	const handleDeleteExperience = (id) => {
		setExperiences(experiences.filter((exp) => exp._id !== id));
	};

	const handleSave = () => {
		onSave({ experience: experiences });
		setIsEditing(false);
	};

	const handleCurrentlyWorkingChange = (e) => {
		setNewExperience({
			...newExperience,
			currentlyWorking: e.target.checked,
			endDate: e.target.checked ? "" : newExperience.endDate,
		});
	};

	return (
		<div className='bg-secondary shadow rounded-lg p-6 mb-6'>
			<h2 className='text-xl font-semibold mb-4 text-primary'>Experience</h2>
			{experiences.map((exp) => (
				<div key={exp._id} className='mb-4 flex justify-between items-start'>
					<div className='flex items-start'>
						<FaTeamspeak size={20} className='text-accent mr-2 mt-1' />
						<div>
							<h3 className='text-accent font-semibold'>{exp.title}</h3>
							<p className='text-neutral'>{exp.company}</p>
							<p className='text-accent-content text-sm'>
								{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
							</p>
							<p className='text-neutral'>{exp.description}</p>
						</div>
					</div>
					{isEditing && (
						<button onClick={() => handleDeleteExperience(exp._id)} className='text-red-500'>
							<X size={20} />
						</button>
					)}
				</div>
			))}

			{isEditing && (
				<div className='mt-4'>
					<input
						type='text'
						placeholder='Team Name'
						value={newExperience.title}
						onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
						className='w-full p-2 border rounded mb-2'
					/>
					<input
						type='text'
						placeholder='Role'
						value={newExperience.company}
						onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
						className='w-full p-2 border rounded mb-2'
					/>
					<input
						type='date'
						placeholder='Start Date'
						value={newExperience.startDate}
						onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
						className='w-full p-2 border rounded mb-2'
					/>
					<div className='flex items-center mb-2'>
						<input
							type='checkbox'
							id='currentlyWorking'
							checked={newExperience.currentlyWorking}
							onChange={handleCurrentlyWorkingChange}
							className='mr-2'
						/>
						<label htmlFor='currentlyWorking'>I currently work here</label>
					</div>
					{!newExperience.currentlyWorking && (
						<input
							type='date'
							placeholder='End Date'
							value={newExperience.endDate}
							onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
							className='w-full p-2 border rounded mb-2'
						/>
					)}
					<textarea
						placeholder='Description'
						value={newExperience.description}
						onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
						className='w-full p-2 border rounded mb-2'
					/>
					<button
						onClick={handleAddExperience}
						className='bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300'
					>
						Add Experience
					</button>
				</div>
			)}

			{isOwnProfile && (
				<>
					{isEditing ? (
						<button
							onClick={handleSave}
							className='mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300'
						>
							Save Changes
						</button>
					) : (
						<button
							onClick={() => setIsEditing(true)}
							className='mt-4 text-primary hover:text-primary-dark transition duration-300'
						>
							Edit Experiences
						</button>
					)}
				</>
			)}
		</div>
	);
};
export default ExperienceSection;
