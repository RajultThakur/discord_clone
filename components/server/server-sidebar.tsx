import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { channel } from "diagnostics_channel";
import { redirect } from "next/navigation";
import { ServerSidebarHeader } from "./server-sidebar-header";

interface serverSidebarProps {
    serverId : string 
}

export const ServerSidebar = async({serverId} : serverSidebarProps) => {
    const profile = await currentProfile();
    if(!profile){
       return redirect("/")
    }

    const server = await db.server.findUnique({
        where : {
            id : serverId
        },
        include:{
            channels : {
                orderBy : {
                    createdAt : "asc"
                }
            },
            members : {
                include : {
                    profile : true
                },
                orderBy : {
                    role : "asc"
                }
            }
        }
    })

    if(!server){
        return redirect("/")
    }

    const textChannel = server?.channels.filter(channel => channel.type === ChannelType.TEXT)
    const audioChannel = server?.channels.filter(channel => channel.type === ChannelType.AUDIO)
    const videoChannel = server?.channels.filter(channel => channel.type === ChannelType.VIDEO)
    const channelMembers = server?.members.filter(member => member.id !== profile.id);

    const role = server?.members.find((member) => member.profileId === profile.id)?.role; 

    return (
        <div className="w-full h-full flex flex-col text-primary bg-[#F2F3F5] dark:bg-[#2B2D31]">
            <ServerSidebarHeader 
            server = {server}
            role = {role}
            />
        </div>
    )


}