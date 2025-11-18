"use client";
import UserSidebar from "../../components/UserSidebar";
import HistoryTable from "../../components/HistoryTable";
import UserNavbar from "../../components/userNavbar";
import { useAuth } from "@/context/AuthContext";
// import { ListFilter, Search, X } from "lucide-react";

export default function Home() {
    const {user} = useAuth()
    return (
        <div className="flex min-h-screen">
            <UserSidebar />

            <main className="md:ml-64 flex-1 p-4 md:p-8 pt-0">
                <UserNavbar title="Client List" dec="Manage and track all your client" />
                

                {/*Cards*/}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
                    <div className="bg-white/40 rounded-lg shadow p-5">
                        <h3>Total Approved</h3>
                        <p className="text-2xl font-bold mt-2">25%</p>
                        <p className="text-sm mt-1">
                            <span className="text-blue-500 bg-blue-200 p-1 rounded text-sm">
                                25%
                            </span>{" "}
                            vs last week
                        </p>
                    </div>

                    <div className="bg-white/40 rounded-lg shadow p-5">
                        <h3>Approved Quotation</h3>
                        <p className="text-2xl font-bold mt-2">25%</p>
                        <p className="text-sm mt-1">
                            <span className="text-green-900 bg-green-200 p-1 rounded text-sm">
                                25%
                            </span>{" "}
                            vs last week
                        </p>
                    </div>

                    <div className="bg-white/40 rounded-lg shadow p-5">
                        <h3>Reject Quotation</h3>
                        <p className="text-2xl font-bold mt-2">25%</p>
                        <p className="text-sm mt-1">
                            <span className="text-red-500 bg-red-200 p-1 rounded text-sm">
                                25%
                            </span>{" "}
                            vs last week
                        </p>
                    </div>

                    <div className="bg-white/40 rounded-lg shadow p-5">
                        <h3>Total Quotation</h3>
                        <p className="text-2xl font-bold mt-2">25%</p>
                        <p className="text-sm mt-1">
                            <span className="text-green-900 bg-green-200 p-1 rounded text-sm">
                                25%
                            </span>{" "}
                            vs last week
                        </p>
                    </div>
                </div>


                <HistoryTable />
            </main>
        </div>
    );
}
