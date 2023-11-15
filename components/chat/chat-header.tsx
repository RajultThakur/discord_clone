import { Hash } from "lucide-react";
import { MobileToggle } from "../mobile-toggle";
import { UserAvatar } from "../user-avatar";
import { SocketIndicator } from "../socket-indicator";
import { ChatVideoButton } from "./chat-video-button";

interface chatHeaderProps {
    serverId : string,
    channelId? : string,
    name : string,
    type : 'channel' | 'conversation',
    imageUrl? : string
}
export const ChatHeader = ({
    serverId,
    channelId,
    name,
    type,
    imageUrl
} : chatHeaderProps) => {
    console.log("chat header server id", serverId)
    return (
        <div className="text-md font-semibold flex items-center px-3 h-12 border-neutral-200 dark:border-neutral-800 border-b-2 w-full">
            <MobileToggle serverId={serverId}/>
            {type === "channel" && (
                <Hash className = "w-5 h-5 mr-2 dark:text-zinc-400 text-zinc-500"/>
            )}
            {type === "conversation" && (
                <UserAvatar 
                src={imageUrl}
                className = "w-8 h-8 md:h-8 md:w-8 mr-2"
                />
            )}
            <p>
                {name}
            </p>
            <div className="ml-auto flex items-center">
                {type === "conversation" && 
                <ChatVideoButton/>
                }
            <SocketIndicator/>
            </div>
        </div>
    )
}