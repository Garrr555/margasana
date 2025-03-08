export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 border-r border-white/80 text-white/80 p-6">
      <h2 className="text-2xl mb-4">
        Admin Sidebar<span className="text-accent">.</span>
      </h2>
      <ul className="space-y-4">
        <li>
          <a href="#" className="hover:text-gray-400">
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400">
            product
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400">
            Profile
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400">
            User
          </a>
        </li>
      </ul>
    </div>
  );
}
