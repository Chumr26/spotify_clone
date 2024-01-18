'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaPlay } from 'react-icons/fa';

interface ListItemProps {
    image: string;
    name: string;
    href: string;
}

const ListItem = ({ image, name, href }: ListItemProps) => {
    const router = useRouter();

    const handleClick = () => router.push(href);
    return (
        <button
            onClick={handleClick}
            className="relative group pr-4 flex items-center rounded-md gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition overflow-hidden"
        >
            <div className="relative min-h-[64px] min-w-[64px]">
                <Image src={image} fill sizes="(min-width: 64px)" alt="Image" />
            </div>
            <p className="font-medium py-5">{name}</p>
            <div className="absolute right-5 p-4 flex items-center justify-center transition opacity-0 rounded-full bg-green-500 drop-shadow-md group-hover:opacity-100 hover:scale-110">
                <FaPlay className="text-black" />
            </div>
        </button>
    );
};

export default ListItem;
