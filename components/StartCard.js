export default function StatCard({ title, value, change }) {
  return (
    <div className="bg-white/50 rounded-lg shadow p-4 sm:p-5 flex-1">
      <h3 className="text-gray-600 text-sm sm:text-base">{title}</h3>

      <p className="text-xl sm:text-2xl font-bold mt-2">
        {value}
      </p>

      <p className="text-green-500 text-xs sm:text-sm mt-1">
        {change} vs last week
      </p>
    </div>
  );
}
