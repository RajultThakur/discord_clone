'use client'

import { useState, useEffect } from "react"
import { CreateChannelModal } from "../modals/create-chennal-modal"
import {CreateServerModal} from "../modals/create-server-modal"
import { DeleteServerModal } from "../modals/delete-server-modal"
import { EditServerModal } from "../modals/edit-server-modal"
import { InviteModal } from "../modals/invite-server-modal"
import { LeaveServerModal } from "../modals/leave-server-modal"
import { MemberModal } from "../modals/manage-member"
import { MessageFileModal } from "../modals/message-file-modal"

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
    return (
        <>
        <CreateServerModal/>
        <InviteModal/>
        <EditServerModal/>
        <MemberModal/>
        <CreateChannelModal/>
        <LeaveServerModal/>
        <DeleteServerModal/>
        <MessageFileModal/>
        </>
    )
}