export default function NewAdPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        Add New Ad
      </h1>

      <form
        action="/api/admin/ads/create"
        method="POST"
        className="space-y-6 bg-white p-8 rounded-2xl shadow"
      >

        {/* Ad Name */}
        <div>
          <label className="block mb-2 font-medium">
            Ad Name
          </label>
          <input
            name="adName"
            placeholder="Example: Homepage Header Banner"
            required
            className="w-full border p-3 rounded-xl"
          />
        </div>

        {/* Location Dropdown (Fixed) */}
        <div>
          <label className="block mb-2 font-medium">
            Ad Location
          </label>

          <select
            name="location"
            required
            defaultValue=""
            className="w-full border p-3 rounded-xl bg-white"
          >
            <option value="" disabled>
              Select Ad Location
            </option>

            <option value="header_top">Header Top (Leaderboard)</option>
            <option value="after_title">After Title</option>
            <option value="tool_middle">Tool Middle</option>
            <option value="bottom_content">Bottom Content</option>
            <option value="sidebar_top">Sidebar Top</option>
            <option value="sidebar_bottom">Sidebar Bottom</option>
            <option value="mobile_sticky">Mobile Sticky</option>
            <option value="footer">Footer</option>
            <option value="default">Default Fallback</option>
          </select>
        </div>

        {/* Ad Code */}
        <div>
          <label className="block mb-2 font-medium">
            Ad Code (HTML / AdSense)
          </label>
          <textarea
            name="adCode"
            placeholder="Paste full ad HTML/JS code here"
            rows={6}
            required
            className="w-full border p-3 rounded-xl font-mono text-sm"
          />
        </div>

        {/* Active Toggle */}
        <label className="flex items-center gap-3">
          <input type="checkbox" name="isActive" />
          Active
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          Save Ad
        </button>

      </form>

    </div>
  );
}