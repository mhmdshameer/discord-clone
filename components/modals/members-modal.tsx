"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { DialogTitle, Dialog, DialogContent, DialogHeader, DialogDescription } from "../ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { ScrollArea } from "../ui/scroll-area";
import { UserAvatar } from "../user-avatar";

export const MembersModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "members";
  const { server } = data as {server: ServerWithMembersWithProfiles};

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Members
          </DialogTitle>
        <DialogDescription className="text-center text-zinc-500">
          {server?.members?.length} members
        </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
         {server?.members?.map((member)=> (
          <div key={member.id} className="flex items-center gap-x-2 mb-6">
            <UserAvatar/>
          </div>
         ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
