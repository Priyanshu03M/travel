import React from 'react'
import toast from 'react-hot-toast';
import { HiOutlineTrash } from 'react-icons/hi'
import { useRouter } from 'next/navigation';


const Removebtn = ({ id }) => {
    const router = useRouter();
    const removeGuide = async () => {
        const confirmed = confirm("Are you sure?");
        if (!confirmed) return;
        try {
            const res = await fetch(`${process.env.API_BASE_URL}/api/users/guides?id=${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                toast.success("Entry deleted successfully");
                // setEntries(entries.filter(entry => entry._id !== id)); // Update the state to remove the deleted entry
                router.refresh()
            } else {
                toast.error("Failed to delete entry");
            }
        } catch (error) {
            console.error("Error deleting entry:", error);
            toast.error("An error occurred");
        }
    };
    return (
        <div>
            <button onClick={removeGuide} className='text-red-400'>
                <HiOutlineTrash size={24} />
            </button>
        </div>
    )
}

export default Removebtn