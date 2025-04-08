
import AdminLayout from '@/components/admin/AdminLayout';
import WelcomeHeader from '@/components/admin/dashboard/WelcomeHeader';
import StatisticsCards from '@/components/admin/dashboard/StatisticsCards';
import UpcomingAppointments from '@/components/admin/dashboard/UpcomingAppointments';
import RecentMessages from '@/components/admin/dashboard/RecentMessages';

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <WelcomeHeader />
        <StatisticsCards />
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <UpcomingAppointments />
          <RecentMessages />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
