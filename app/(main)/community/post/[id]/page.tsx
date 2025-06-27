import { getCommunityPostById } from "@/lib/api/community"
import { getComments } from "@/lib/api/comments"
import { CommunityPostDetail } from "@/components/community/CommunityPostDetail"
import { notFound } from "next/navigation"

interface CommunityPostDetailPageProps {
  params: {
    id: string
  }
}

export default async function CommunityPostDetailPage({ params }: CommunityPostDetailPageProps) {
  const [post, comments] = await Promise.all([getCommunityPostById(params.id), getComments(`community-${params.id}`)])

  if (!post) {
    notFound()
  }

  return <CommunityPostDetail post={post} comments={comments} />
}
