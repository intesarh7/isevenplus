import WishRenderer from "./WishRenderer";

export default function WishPreview({
  event,
  name,
  message,
  theme,
}: any) {
  return (
    <div className="border rounded-xl overflow-hidden shadow-md">

      {/* Preview Header */}
      <div className="bg-gray-100 px-4 py-2 text-sm font-medium">
        Live Preview
      </div>

      {/* Preview Content */}
      <div className="h-125 overflow-hidden">
        <WishRenderer
          event={event}
          name={name || "Your Name"}
          message={message || "Your message will appear here"}
          theme={theme}
        />
      </div>
    </div>
  );
}