import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Fitness Meal Planner
        </Link>
        <div className="space-x-6">
          <Link href="/" className="hover:text-blue-500">Home</Link>
          <Link href="/pricing" className="hover:text-blue-500">Pricing</Link>
          <Link href="/meal-plans" className="hover:text-blue-500">Meal Plans</Link>
          <Link href="/profile" className="hover:text-blue-500">Profile</Link>
        </div>
      </div>
    </nav>
  );
}
