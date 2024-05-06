import Link from "next/link"

import { PreviewAlert } from "components/preview-alert"

export function layoout({ children }) {
  return (
    <>
      <PreviewAlert />
      <div className="max-w-screen-md px-6 mx-auto ">
        <header>
          <div className="container flex items-center justify-center py-6 mx-auto ">
            <Link href="/" className="text-2xl font-semibold no-underline">
              Testing Next.js for Drupal
            </Link>
          </div>
        </header>
        <main className="container py-10 mx-auto">{children}</main>
      </div>
    </>
  )
}
