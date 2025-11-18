"use client";
import React from "react";

const dummyData = [
  { id: 1, name: "Smith Jones", date: "Jan.02.2025", amount: "$230", status: "Reject" },
  { id: 2, name: "Victoria Roy", date: "Feb.05.2025", amount: "$340", status: "Reject" },
  { id: 3, name: "Liam James", date: "Feb.06.2025", amount: "$550", status: "Reject" },
  { id: 4, name: "David Liam", date: "Feb.07.2025", amount: "$666", status: "Reject" },
  { id: 5, name: "Robert Kevin", date: "Feb.08.2025", amount: "$800", status: "Reject" },
  { id: 6, name: "Michael Roy", date: "Feb.09.2025", amount: "$1200", status: "Reject" },
  { id: 7, name: "Lucas Roy", date: "Feb.10.2025", amount: "$1400", status: "Reject" },
];

export default function ClientTable() {
  return (
    <div className="bg-white rounded-lg shadow mt-6 border border-[#0000003D] p-2">

      {/* ---- Desktop Table ---- */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0000003D] text-left">
              <th className="py-3 px-3 font-semibold">#</th>
              <th className="py-3 px-3 font-semibold">Client Name</th>
              <th className="py-3 px-3 font-semibold">Company Name</th>
              <th className="py-3 px-3 font-semibold">Phone Number</th>
              <th className="py-3 px-3 font-semibold">Status</th>
              <th className="py-3 px-3 font-semibold">Date</th>
              <th className="py-3 px-3 font-semibold">Amount</th>
            </tr>
          </thead>

          <tbody>
            {dummyData.map((item) => (
              <tr
                key={item.id}
                className="border-b border-[#0000003D] hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="py-2 px-3">{item.id}</td>
                <td className="py-2 px-3">{item.name}</td>
                <td className="py-2 px-3 text-[#00000099]">{item.name}</td>
                <td className="py-2 px-3 text-[#00000099]">{item.amount}</td>
                <td className="py-2 px-3">
                  <span
                    className={`inline-block px-3 py-1 text-xs rounded-full ${
                      item.status === "Approved"
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-2 px-3">{item.date}</td>
                <td className="py-2 px-3">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---- Mobile Card Layout ---- */}
      <div className="sm:hidden flex flex-col gap-3">
        {dummyData.map((item) => (
          <div
            key={item.id}
            className="border border-[#0000003D] rounded-lg p-3 shadow-sm bg-white"
          >
            {/* Name + Status */}
            <div className="flex justify-between items-center">
              <p className="font-semibold">{item.name}</p>

              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  item.status === "Approved"
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-500"
                }`}
              >
                {item.status}
              </span>
            </div>

            <p className="text-sm text-[#00000099] mt-1">
              Company: {item.name}
            </p>

            <p className="text-sm text-[#00000099]">Phone: {item.amount}</p>

            <p className="text-sm text-[#00000099]">Date: {item.date}</p>

            <div className="flex justify-between items-center mt-2">
              <p className="text-sm font-medium">ID: {item.id}</p>
              <p className="font-semibold">{item.amount}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
