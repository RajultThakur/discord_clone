import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NavigationAction } from "./navigation-action";
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NavigationItems } from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

export const Navigation = async() => {
    const profile = await currentProfile();
    
    if(!profile){
        redirect("/")
    }

    const servers = await db.server.findMany({
        where : {
            members : {
                some : {
                    profileId : profile.id
                }

            }
        }
    })
    return(
        <div className="h-full flex flex-col items-center w-full dark:bg-[#1E1F22] space-y-4 text-primary py-3 bg-[#E3E5E8]">
            <NavigationAction/>
            <Separator  className="h-[2px] mx-auto w-10 rounded-md bg-zinc-300 dark:bg-zinc-700"/>

            <div className="flex-1 w-full">
                {servers.map((server, idx) => (
                    <div className="mb-4" key = {idx}>
                        <NavigationItems id = {server.id} name = {server.name}
                        imageUrl={server.imageUrl} />
                    </div>
                ))}
            </div>
            <div className="flex items-center flex-col pb-3 gap-y-4">
                <ModeToggle/>
                <UserButton
                afterSignOutUrl="/"
                appearance={{
                    elements : {
                        avatarBox : "h-[48px] w-[48px]"
                    }
                }}
                />

            </div>
        </div>
    )
}