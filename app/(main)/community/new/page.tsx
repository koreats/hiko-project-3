"use client"

import { CommunityPostForm } from "@/components/community/CommunityPostForm"

export default function NewCommunityPostPage() {
  return (
    <div className="bg-main-bg min-h-screen">
      <CommunityPostForm mode="create" />
    </div>
  )
}
