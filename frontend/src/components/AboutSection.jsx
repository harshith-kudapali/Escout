import { useState, useEffect } from "react";

const AboutSection = ({ userData, isOwnProfile, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [about, setAbout] = useState(userData.about || "");

    // Optional: Fetch updated data from backend if needed
    useEffect(() => {
        setAbout(userData.about || "");
    }, [userData]);

    const handleSave = async () => {
        // Save the updated 'about' info to the backend
        await onSave({ about });
        setIsEditing(false); // Exit editing mode
    };

    return (
        <div className='bg-secondary shadow rounded-lg p-6 mb-6 text-neutral'>
            <h2 className='text-xl font-semibold mb-4 text-primary'>About</h2>
            {isOwnProfile ? (
                isEditing ? (
                    <>
                        <textarea
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            className='bg-secondary w-full p-2 border rounded text-neutral'
                            rows='4'
                        />
                        <button
                            onClick={handleSave}
                            className='mt-2 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark 
                                transition duration-300'
                        >
                            Save
                        </button>
                    </>
                ) : (
                    <>
                        <p>{userData.about || "This user hasn't shared anything about themselves yet."}</p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className='mt-2 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300'
                        >
                            Edit
                        </button>
                    </>
                )
            ) : (
                <p>{userData.about || "This user hasn't shared anything about themselves yet."}</p>
            )}
        </div>
    );
};

export default AboutSection;
