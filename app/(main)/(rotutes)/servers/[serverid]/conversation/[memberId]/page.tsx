import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChatHeader } from "@/components/chat/chat-header";
import { getOrCreateConversation } from "@/lib/conversation";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    memberId: string;
  }
}

const MemberIdPage = async ({
  params
}: ChannelIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    }
  });

  if(!currentMember){
    redirect("/")
  }

  const conversation = await getOrCreateConversation(currentMember.id, params.memberId);

  if(!conversation){
    redirect(`/server/${params.serverId}`)
  }

  const {memberOne, memberTwo} = conversation;

  const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne
 
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full" >
        <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
         serverId = {params?.serverId}
         name = {otherMember.profile.name}
         type = "conversation" />
    </div>
  )
  }
export default MemberIdPage;