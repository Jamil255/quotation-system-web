"use client"
import Link from 'next/link'
import React from 'react'

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-white">
      <div className="text-center max-w-md">
        {/* SVG Icon */}
        <svg
          width="117"
          height="145"
          viewBox="0 0 117 145"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto"
        >
          <rect
            x="4"
            y="63.4358"
            width="108.316"
            height="76.6387"
            rx="20"
            stroke="#FF0004"
            strokeWidth="8"
          />
          <path
            d="M22.7686 59.6831V38.1522C22.7686 19.0964 41.0822 3.99997 57.911 4C71.275 4.00002 93.5483 14.6417 93.5483 38.1524V59.6831"
            stroke="#FF0004"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          <path
            d="M51.6659 117.594L52.9033 103.983C50.1759 102.663 45.0181 98.142 46.206 90.6186C46.6185 87.2363 50.0484 80.2244 58.6528 80.2244C62.9175 80.2244 69.4693 82.2042 70.9542 90.3711C71.5392 93.5884 71.2017 100.023 64.5197 103.735L65.5248 117.594C65.7228 123.138 60.8227 124.194 58.3479 124.029C52.6063 124.029 51.5009 119.739 51.6659 117.594Z"
            stroke="#FF0004"
            strokeWidth="8"
            strokeLinejoin="round"
          />
        </svg>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mt-5">ACCESS DENIED</h1>

        {/* Description */}
        <p className="text-base md:text-lg text-[#00000099] mt-5">
          You do not have permission to access this page.
        </p>

        {/* Button */}
        <Link href={"/"}>
          <button className="btn mt-5 px-10">
            Go Back
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Unauthorized
