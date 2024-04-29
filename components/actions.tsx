"use client"

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";
import ConfirmModal from "./confirm-modal";

import { useApiMutation } from "@/hooks/use-api-mutation";

interface ActionsProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
}

import React from 'react'
import { Link2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { Button } from "./ui/button";

const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title
}: ActionsProps) => {

    const { mutate, pending } = useApiMutation(api.board.remove)

    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`
        )
            .then(() => toast.success("Link copied to clipboard"))
            .catch(() => toast.error("Failed to copy link"))
    }

    const onDelete = ()=> {
        mutate({id})
            .then(() => {
                toast.success("Board deleted")
            })
            .catch(() => {
                toast.error("Failed to delete board")
            })
    }

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            {children}
        </DropdownMenuTrigger> 

        <DropdownMenuContent
            onClick={(e) => e.stopPropagation()}
            side={side}
            sideOffset={sideOffset}
            className="w-60"
        >
            <DropdownMenuItem
                onClick={onCopyLink}
                className="p-3 cursor-pointer"
            >
                <Link2 className="h-4 w-4 mr-2"/>
                Copy Board Link
            </DropdownMenuItem>

            <ConfirmModal
                header="Delete Board"
                description="This will permanently delete the board and all its contents. "
                disabled={pending}
                onConfirm={onDelete}
            >
                <Button
                    variant={"ghost"}
                    className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
                >
                    <Trash2 className="h-4 w-4 mr-2"/>
                        Delete
                </Button>
                </ConfirmModal>
        </DropdownMenuContent> 
    </DropdownMenu>
  )
}

export default Actions