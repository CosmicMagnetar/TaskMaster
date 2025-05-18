export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-600 to-pink-300">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form>
          <input type="text" placeholder="Name" className="w-full mb-3 p-2 border rounded" />
          <input type="email" placeholder="Email" className="w-full mb-3 p-2 border rounded" />
          <input type="password" placeholder="Password" className="w-full mb-3 p-2 border rounded" />
          <button className="w-full p-2 bg-purple-600 text-white rounded">Register</button>
        </form>
      </div>
    </div>
  );
}