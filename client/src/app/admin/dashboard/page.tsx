"use client";
import { withAuth } from '@/components/auth/withAuth';

function page() {
  return (
    <div>
      DashBoard
    </div>
  )
}

export default withAuth(page)