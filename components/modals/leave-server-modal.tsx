"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-model-store";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";

export const LeaveServerModal = () => {
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const { server } = data;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "leaveServer";

  const handleLeave = async() => {
    try {
        setIsLoading(true);
        const response = await axios.patch(`/api/servers/${server?.id}/leave`)
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
            Leave Server
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to leave <span className="text-indigo-500 font-semibold" >{server?.name}</span>
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
