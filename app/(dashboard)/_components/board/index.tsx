"use client";
import Image from "next/image";
import Link from "next/link";
import Overlay from "./overlay";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import Footer from "./footer";

interface BoardCardProps {
    title: string;
    id: string;
    imageUrl: string;
    authorId: string;
    authorName: string;
    createdAt: number;  
    orgId: string;
    isFavorite: boolean;
}

const BoardCard = ({
    title, 
    id, 
    imageUrl,
    authorId, 
    authorName, 
    createdAt, 
    orgId, 
    isFavorite
}: BoardCardProps) => {

    const { userId } = useAuth();
    const authorLabel = userId === authorId ? "You" : authorName;
    const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });
    
  return (
    <Link href={`/board/${id}`}>
        <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
         <div className="relative flex-1 bg-amber-50">
            <Image 
                src={imageUrl}
                alt={title}
                fill
                className="object-fit"
            />
            <Overlay />
         </div>
         <Footer 
            isFavorite={isFavorite}
            title={title}
            authorLabel={authorLabel}
            createdAtLabel={createdAtLabel}
            onClick={() => {}}
            disabled={false}
         />
        </div>        
    </Link>
  )
}

export default BoardCard