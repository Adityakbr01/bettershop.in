"use client";
import { withAuth } from '@/components/auth/withAuth'

function page() {
  return (
    <div>page</div>
  )
}

export default withAuth(page)