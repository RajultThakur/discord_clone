import { Channel, ChannelType, Server } from "@prisma/client";
import {create} from "zustand"

export type ModelType = "createServer" | "invite" | "edit" | "manageMember" | "createChannel" | "leaveServer" | "deleteServer" | "deleteChannel" | "editChannel" | "messageFile"

interface ModelData {
    server? : Server;
    channel?: Channel;
    channelType?: ChannelType;
    apiUrl?: string;
    query?: Record<string, any>;
}

interface ModelStore {
    type : ModelType | null;
    data : ModelData
    isOpen : boolean;
    onOpen : (type : ModelType, data?:ModelData) => void;
    onClose : () => void
}

export const useModal = create<ModelStore>((set) => ({
    type : null,
    data : {},
    isOpen : false,
    onOpen : (type, data= {}) => set({isOpen: true, type, data}),
    onClose : ()=> set({isOpen:false,type:null})
}))
