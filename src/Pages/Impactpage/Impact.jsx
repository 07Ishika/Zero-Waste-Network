import { useEffect, useState } from "react"
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from "recharts"
import { FaBoxOpen, FaUtensils, FaHandsHelping, FaUsers } from "react-icons/fa"
import { FiArrowRight } from "react-icons/fi"
import API from "../../api"
import Footer from "../Homepage/Footer"

const COLORS = ["#16a34a", "#f97316", "#3b82f6", "#eab308", "#8b5cf6"]

const Impact = () => {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        API.get('/stats')
            .then(res => setStats(res.data))
            .catch(err => { console.error(err); setError(true) })
            .finally(() => setLoading(false))
    }, [])

    if (loading) return (
        <div className="flex justify-center items-center h-64 text-green-600 text-lg">
            Loading impact data...
        </div>
    )

    if (error || !stats) return (
        <div className="flex justify-center items-center h-64 text-red-500 text-lg">
            Could not load stats. Make sure the backend is running.
        </div>
    )

    const statCards = [
        { label: "Food Listings", value: stats.totalFood, icon: <FaBoxOpen className="text-green-600 text-2xl" /> },
        { label: "Meals Served", value: stats.totalServings, icon: <FaUtensils className="text-green-600 text-2xl" /> },
        { label: "Volunteers", value: stats.totalVolunteers, icon: <FaHandsHelping className="text-green-600 text-2xl" /> },
        { label: "Members", value: stats.totalUsers, icon: <FaUsers className="text-green-600 text-2xl" /> },
    ]

    return (
        <>
            <section className="flex flex-col items-center text-center py-16 bg-gradient-to-b from-green-50 to-white">
                <div className="flex items-center gap-2 px-8 py-3 text-sm font-semibold text-green-700 bg-green-100 rounded-full mb-6">
                    <FaHandsHelping />
                    <span>Real-time Community Impact</span>
                </div>
                <h1 className="text-5xl font-bold text-black leading-tight max-w-3xl">
                    Together we're making a
                    <span className="text-green-600"> real difference</span>
                </h1>
                <p className="mt-4 text-gray-600 text-lg max-w-2xl">
                    Every donation, every volunteer, every meal rescued — it all adds up.
                    Join our growing community and be part of the change.
                </p>

                {/* Stat Cards */}
                <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {statCards.map((s, i) => (
                        <div key={i} className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md min-w-36">
                            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                                {s.icon}
                            </div>
                            <h3 className="text-2xl font-bold">{s.value}</h3>
                            <p className="text-gray-600 text-sm">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Charts Section */}
            <section className="bg-gradient-to-b from-white to-green-50 py-14 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-2">Live Activity</h2>
                    <p className="text-center text-gray-500 mb-10">Data pulled directly from our database in real-time</p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Bar Chart */}
                        <div className="bg-white border border-gray-100 rounded-xl shadow-md p-6">
                            <h3 className="font-semibold text-lg mb-4">Food Listed (Last 7 Days)</h3>
                            {stats.dailyListings.length === 0 ? (
                                <p className="text-gray-400 text-center py-10">No data yet — start donating food!</p>
                            ) : (
                                <ResponsiveContainer width="100%" height={220}>
                                    <BarChart data={stats.dailyListings}>
                                        <XAxis dataKey="day" />
                                        <YAxis allowDecimals={false} />
                                        <Tooltip />
                                        <Bar dataKey="listings" fill="#16a34a" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>

                        {/* Pie Chart */}
                        <div className="bg-white border border-gray-100 rounded-xl shadow-md p-6">
                            <h3 className="font-semibold text-lg mb-4">Food by Category</h3>
                            {stats.foodByType.length === 0 ? (
                                <p className="text-gray-400 text-center py-10">No data yet — submit a food listing!</p>
                            ) : (
                                <ResponsiveContainer width="100%" height={220}>
                                    <PieChart>
                                        <Pie data={stats.foodByType} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                            {stats.foodByType.map((_, i) => (
                                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Legend />
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-b from-green-50 to-white py-14 px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <h3 className="text-3xl font-bold text-gray-900">Want to see your impact here?</h3>
                    <p className="text-gray-600 mt-3 text-lg">
                        Every meal you donate or pickup you make is counted in real-time. Start today and watch the numbers grow.
                    </p>
                    <div className="flex justify-center gap-4 mt-8">
                        <a href="/update"
                            className="flex items-center gap-2 px-7 py-3 text-lg font-semibold text-white bg-green-600 rounded-full shadow-md hover:bg-green-700 transition">
                            Donate Food <FiArrowRight />
                        </a>
                        <a href="/Volunteer"
                            className="px-7 py-3 text-lg font-semibold text-black bg-white border border-gray-300 rounded-full shadow-md hover:bg-orange-400 transition">
                            Volunteer
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Impact
