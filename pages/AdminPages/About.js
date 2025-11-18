import SidebarProfile from '@/components/SidebarProfile'
import React from 'react'

const About = () => {
  return (
        <div>
            <div className="flex min-h-screen">
                <SidebarProfile />
                <div className='md:ml-64 flex-1 p-8 overflow-y-auto h-150'>
                    <h1 className='text-center text-2xl font-semibold mt-10'>About App</h1>
                    <h2 className='text-xl font-medium mt-10'>1 Quotation Creation</h2>
                    <p className='text-[#00000099] text-lg ml-3'>Generate professional qoutations instantly with auto-calculated totals and tax summaries.</p>
                    <h2 className='text-xl font-medium mt-10'>2 Custom Field Builder</h2>
                    <p className='text-[#00000099] text-lg ml-3'>Super Admins can add, edit, or remove fields to match their company's specific needs — no coding required.</p>
                    <h2 className='text-xl font-medium mt-10'>3 Client Management</h2>
                    <p className='text-[#00000099] text-lg ml-3'>Store and organize client details, view history, and access past quotations anytime.</p>
                    <h2 className='text-xl font-medium mt-10'>4 Dashboard Analytics</h2>
                    <p className='text-[#00000099] text-lg ml-3'>Track tolal quotating panding. approvals. and client data with an real-time dashboard,</p>
                    <h2 className='text-xl font-medium mt-10'>5 Template Designer</h2>
                    <p className='text-[#00000099] text-lg ml-3'>Create and customize quotation templates to match your brand identity and layout preferences.</p>
                </div>
            </div>
        </div>
  )
}

export default About