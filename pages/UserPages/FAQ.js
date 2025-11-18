import UserSidebarProfile from '@/components/UserSidebarProfile'
import { Plus } from 'lucide-react'
import React from 'react'

const FAQ = () => {
  return (
    <div>
      <div className="flex min-h-screen">
        <UserSidebarProfile />
        <div className="md:ml-64 flex-1 p-8 overflow-y-auto h-150">
          <h1 className="text-center text-2xl font-semibold mt-10">FAQs</h1>
          <details
            className="collapse border border-[#00000014] mt-5"
            name="my-accordion-det-1"
            open
          >
            <summary className="collapse-title font-semibold flex justify-between">
              I forgot my password. What should I do?
              <Plus className="text-sky-400" />
            </summary>
            <div className="collapse-content text-sm">
              Click the "Sign Up" button in the top right corner and follow the
              registration process.
            </div>
          </details>
          <details
            className="collapse border border-[#00000014] mt-2"
            name="my-accordion-det-1"
            open
          >
            <summary className="collapse-title font-semibold flex justify-between">
              I forgot my password. What should I do?
              <Plus className="text-sky-400" />
            </summary>
            <div className="collapse-content text-sm">
              Click the "Sign Up" button in the top right corner and follow the
              registration process.
            </div>
          </details>
          <details
            className="collapse border border-[#00000014] mt-2"
            name="my-accordion-det-1"
            open
          >
            <summary className="collapse-title font-semibold flex justify-between">
              I forgot my password. What should I do?
              <Plus className="text-sky-400" />
            </summary>
            <div className="collapse-content text-sm">
              Click the "Sign Up" button in the top right corner and follow the
              registration process.
            </div>
          </details>
          <details
            className="collapse border border-[#00000014] mt-2"
            name="my-accordion-det-1"
            open
          >
            <summary className="collapse-title font-semibold flex justify-between">
              I forgot my password. What should I do?
              <Plus className="text-sky-400" />
            </summary>
            <div className="collapse-content text-sm">
              Click the "Sign Up" button in the top right corner and follow the
              registration process.
            </div>
          </details>
          <details
            className="collapse border border-[#00000014] mt-2"
            name="my-accordion-det-1"
            open
          >
            <summary className="collapse-title font-semibold flex justify-between">
              I forgot my password. What should I do?
              <Plus className="text-sky-400" />
            </summary>
            <div className="collapse-content text-sm">
              Click the "Sign Up" button in the top right corner and follow the
              registration process.
            </div>
          </details>
          <details
            className="collapse border border-[#00000014] mt-2"
            name="my-accordion-det-1"
            open
          >
            <summary className="collapse-title font-semibold flex justify-between">
              I forgot my password. What should I do?
              <Plus className="text-sky-400" />
            </summary>
            <div className="collapse-content text-sm">
              Click the "Sign Up" button in the top right corner and follow the
              registration process.
            </div>
          </details>
          <details
            className="collapse border border-[#00000014] mt-2"
            name="my-accordion-det-1"
            open
          >
            <summary className="collapse-title font-semibold flex justify-between">
              I forgot my password. What should I do?
              <Plus className="text-sky-400" />
            </summary>
            <div className="collapse-content text-sm">
              Click the "Sign Up" button in the top right corner and follow the
              registration process.
            </div>
          </details>
          <details
            className="collapse border border-[#00000014] mt-2"
            name="my-accordion-det-1"
            open
          >
            <summary className="collapse-title font-semibold flex justify-between">
              I forgot my password. What should I do?
              <Plus className="text-sky-400" />
            </summary>
            <div className="collapse-content text-sm">
              Click the "Sign Up" button in the top right corner and follow the
              registration process.
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}

export default FAQ
