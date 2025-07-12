import DashboardCard from '@/components/admin/DashboardCard';
import { PackageCheck, ShoppingCart, DollarSign, Users } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Orders"
          value="1,245"
          icon={<ShoppingCart />}
        />
        <DashboardCard
          title="Revenue"
          value="Rs. 18,730"
          icon={<DollarSign />}
        />
        <DashboardCard
          title="Users"
          value="345"
          icon={<Users />}
        />
        <DashboardCard
          title="Products"
          value="56"
          icon={<PackageCheck />}
        />
      </div>
    </main>
  );
}
