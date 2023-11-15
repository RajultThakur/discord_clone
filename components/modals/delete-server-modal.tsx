"use client";

import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-model-store";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";

export const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { server } = data;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "deleteServer";

  const handleLeave = async() => {
    try {
        setIsLoading(true);
        const response = await axios.delete(`/api/servers/${server?.id}`)
        onClose()
        router.refresh();
        router.push("/")
    } catch (error) {
        console.log(error)
    }finally{
        setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="p-2 text-center text-2xl font-extrabold">
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to do this? <span className="text-indigo-500 font-semibold" >{server?.name}</span> will be permanently deleted
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>

        <div className="w-full flex items-center justify-between">
         <Button
         disabled = {isLoading}
         onClick={onClose}
         size="sm"
         className="border-none outline-none">
            cancel
         </Button>
         <Button
         size="sm"
         onClick={handleLeave}
         disabled = {isLoading}
         variant = "primary">
            leave
         </Button>
        </div>
              </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
