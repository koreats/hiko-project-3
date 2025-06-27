import { getCommunityPostById } from "@/lib/api/community"
import { CommunityPostForm } from "@/components/community/CommunityPostForm"
import { notFound } from "next/navigation"

interface EditCommunityPostPageProps {
  params: {
    id: string
  }
}

export default async function EditCommunityPostPage({ params }: EditCommunityPostPageProps) {
  const post = await getCommunityPostById(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="bg-main-bg min-h-screen">
      <CommunityPostForm
        mode="edit"
        initialData={{
          title: post.title,
          community: post.community,
          category: post.category,
          content: post.content,
          images: post.images || [],
        }}
        postId={params.id}
      />
    </div>
  )
}
