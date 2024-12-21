import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Image, Loader, Wand2, Video } from "lucide-react";
import axios from 'axios';

const PostCreation = ({ user }) => {
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const queryClient = useQueryClient();

    const { mutate: createPostMutation, isPending } = useMutation({
        mutationFn: async (postData) => {
            const res = await axiosInstance.post("/posts/create", postData, {
                headers: { "Content-Type": "application/json" },
            });
            return res.data;
        },
        onSuccess: () => {
            resetForm();
            toast.success("Post created successfully");
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (err) => {
            toast.error(err.response.data.message || "Failed to create post");
        },
    });

    const handlePostCreation = async () => {
        try {
            const postData = { content };
            if (image) postData.image = await readFileAsDataURL(image);
            if (video) postData.video = await readFileAsDataURL(video);

            createPostMutation(postData);
        } catch (error) {
            console.error("Error in handlePostCreation:", error);
        }
    };

    const resetForm = () => {
        setContent("");
        setImage(null);
        setVideo(null);
        setImagePreview(null);
        setVideoPreview(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            readFileAsDataURL(file).then(setImagePreview);
        } else {
            setImagePreview(null);
        }
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        setVideo(file);
        if (file) {
            setVideoPreview(URL.createObjectURL(file));
        } else {
            setVideoPreview(null);
        }
    };

    const readFileAsDataURL = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const generatePost = async () => {
        setIsGenerating(true);
        try {
            const response = await axios.post(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBpSaPZll-RXFLJq-g2kWwtV9IyJD1w7dc',
                {
                    contents: [{
                        parts: [{
                            text: `Generate a social media post of eSports based on "${content}" 100 words maximum`
                        }]
                    }]
                }
            );

            // Extract generated post text
            const postText = response.data.candidates[0].content.parts[0].text;
            setContent(postText.replace(/\*+/g, ''));
        } catch (error) {
            console.error('Post generation error:', error);
            // Fallback to a simple generated post if API fails
            setContent(`📝 ${content}`);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className='bg-secondary rounded-lg shadow mb-4 p-4'>
            <div className='flex space-x-3'>
                <img src={user.profilePicture || "/avatar.png"} alt={user.name} className='size-12 rounded-full' />
                <textarea
                    placeholder="What's on your mind?"
                    className='w-full p-3 rounded-lg bg-base-100   text-neutral  resize-none transition-colors duration-200 min-h-[100px]'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            {(imagePreview || videoPreview) && (
                <div className='mt-4'>
                    {imagePreview && <img src={imagePreview} alt='Selected' className='w-full h-auto rounded-lg' />}
                    {videoPreview && <video src={videoPreview} controls className='w-full h-auto rounded-lg' />}
                </div>
            )}

            <div className='flex justify-between items-center mt-4'>
                <div className='flex space-x-4'>
                    <label className='flex items-center text-info hover:text-info-dark transition-colors duration-200 cursor-pointer'>
                        <Image size={20} className='mr-2' />
                        <span>Photo</span>
                        <input type='file' accept='image/*' className='hidden' onChange={handleImageChange} />
                    </label>
                    <label className='flex items-center text-info hover:text-info-dark transition-colors duration-200 cursor-pointer'>
                        <Video size={20} className='mr-2' />
                        <span>Video</span>
                        <input type='file' accept='video/*' className='hidden' onChange={handleVideoChange} />
                    </label>
                </div>

                <div className='flex space-x-2'>
                    <button
                        onClick={generatePost}
                        disabled={isGenerating}
                        className='bg-purple-500 text-white rounded-lg px-2 py-2 hover:bg-purple-600 transition-colors duration-200 flex items-center'>
                        <Wand2 className='mr-2' size={20} /> {isGenerating ? 'Generating...' : 'Generate'}
                    </button>

                    <button
                        className='bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark transition-colors duration-200'
                        onClick={handlePostCreation}
                        disabled={isPending}
                    >
                        {isPending ? <Loader className='size-5 animate-spin' /> : "Share"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostCreation;
