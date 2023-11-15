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
// import { useModal } from "@/hooks/use-modal-store";
import { useModal } from "@/hooks/use-model-store";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";

export const MemberModal = () => {
  const { isOpen, onClose,onOpen, type, data} = useModal();
  const {server} = data;
  const router = useRouter();
  const origin = useOrigin();

  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const invitationUrl = `${origin}/invite/${server?.inviteCode}`

  const isModalOpen = isOpen && type === "manageMember";

  const onCopy = () => {
    navigator.clipboard.writeText(invitationUrl)
    setCopied(true);
    setTimeout(() => {
      setCopied(false)
    }, 1000);
  }

  const generateInvitationCode = async() => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);
      onOpen("invite", {server : response.data})
    } catch (error) {
      console.log(error)
    }finally {
      setIsLoading(false)

    }
  }

  return (
    <Dialog  open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="p-2 text-center text-2xl font-extrabold">
            Send Invitation 
          </DialogTitle>
          <DialogDescription className="text-center">
            <div className="flex gap-2 flex-col items-start">
              <label className="" htmlFor="">Server invitation code</label>
              <div className="w-full flex item-center gap-4">
              <Input disabled={isLoading} className="flex-1 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white"
              value={invitationUrl} />
              {/* <Check/> */}
              <button
              disabled={isLoading}
              onClick={onCopy}>
                {copied
                 ? <Check/>
                 : <Copy/>
                }
              </button>
              </div>
              <Button 
              disabled={isLoading}
              onClick={generateInvitationCode}
              variant="link"
              className="text-zinc-500 px-0">Generate new invitation code 
              <RefreshCw className = "w-4 h-4 ml-2"/>
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}