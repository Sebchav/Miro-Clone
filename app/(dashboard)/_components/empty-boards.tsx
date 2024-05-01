"use client";

import Image from 'next/image'

import { api } from "@/convex/_generated/api";

import { Button } from '@/components/ui/button'
import { useOrganization } from '@clerk/nextjs';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const EmptyBoards = () => {

  const router = useRouter();

  const { organization } = useOrganization();

  const { mutate, pending} = useApiMutation(api.board.create);

  const onClick = () => {

    if(!organization) return;

    mutate({
        title: "New Board",
        orgId:  organization.id
    })
    .then((id)=> {
        toast.success("Board created successfully")
        router.push(`/board/${id}`)
        //REDIRECT TO BOARD(ID)
    })
    .catch((error)=> {
        toast.error("Failed to create Board")
    })
  }

  return (
    <div className='h-full flex flex-col items-center justify-center'>
        <Image 
            src={"note.svg"}
            height={110}
            width={110}
            alt="Empty Favorites"
        />

        <h2 className='text-2xl font-semibold mt-6'>
            Create your first Board
        </h2>

        <p className='text-muted-foreground text-sm mt-2'>
            Start by creating a Board for your team
        </p>
        <div className='mt-6'>
            <Button disabled={pending} onClick={onClick} size={"lg"}>
                Create Board
            </Button>
        </div>
    </div>
  )
}

export default EmptyBoards