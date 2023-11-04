import { ServerSidebar } from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ServerIdLayout = async({
    children,
    params,
}:{
    children :React.ReactNode,
    params : {serverid : string}
}) => {

    const profile = await currentProfile();

    if(!profile){
        redirectToSignIn()
    }

    const server = await db.server.findUnique({
        where :{
            id : params.serverid,
            members : {
                some : {
                    profileId : profile?.id
                }
            }
        }
    })

    if(!server){
        redirect("/")
    }

    return (
        <div className="h-full">
            <div className="hidden md:flex flex-col h-full w-60 z-20 inset-y-0 fixed">
            <ServerSidebar serverId={params.serverid}/>
            </div>
            <main className="md:pl-60">
                {children}
            </main>
        </div>
    )

}

export default ServerIdLayout