'use client'

import Link from "next/link"


export default function Page() {
  return (
    <>
      <p>There are two types of user on this app. Use the appropriate link below</p>
      <br />
      <Link href="/auth/admin">Login as Admin</Link>

      <br /><br />
      <Link href="/auth/client">Login as Client</Link>
    </>
  )
}
