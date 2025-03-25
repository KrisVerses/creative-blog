import { cn } from "@/lib/utils";

interface TagProps {
    tag: string;
    isSelected?: boolean;
    onClick?: () => void;
}

const Tag: React.FC<TagProps> = ({ tag, isSelected = false, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1 rounded-full text-sm hover:text-white ${isSelected
                ? 'bg-[#FF6F61]/80 text-white'
                : 'bg-gray-100 hover:bg-[#FF6F61]'
                }`}
        >
            {tag}
        </button>
    )
}

export default Tag; 