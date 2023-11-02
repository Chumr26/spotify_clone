'use client';

import { FaPlay } from 'react-icons/fa';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ListItemProps {
    image: string;
    name: string;
    href: string;
}

export default function ListItem({ image, name, href }: ListItemProps) {
    const router = useRouter();
    function onClick() {
        // Add authentication before push
        router.push(href);
    }
    return (
        <button
            onClick={onClick}
            className="relative flex group items-center rounded-md overflow-hidden gap-x-4
                bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
        >
            <div className="relative min-h-[64px] min-w-[64px]">
                <Image
                    src={image}
                    className="object-cover"
                    fill
                    sizes="(min-width: 64px)"
                    alt="Image"
                />
            </div>
            <p className="font-medium truncate py-5">{name}</p>
            <div
                className="absolute right-5 transition rounded-full flex items-center justify-center
                    bg-green-500 p-4 drop-shadow-md opacity-0 group-hover:opacity-100 hover:scale-110"
            >
                <FaPlay className="text-black" />
            </div>
        </button>
    );
}
