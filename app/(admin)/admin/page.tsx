export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Total Tools</h3>
          <p className="text-2xl mt-2">--</p>
        </div>

        <div className="bg-white shadow p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Active Ads</h3>
          <p className="text-2xl mt-2">--</p>
        </div>

        <div className="bg-white shadow p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Footer Links</h3>
          <p className="text-2xl mt-2">--</p>
        </div>
      </div>
    </div>
  );
}