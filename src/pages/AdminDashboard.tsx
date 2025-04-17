
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingManagement from '@/components/admin/BookingManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

const AdminDashboard = () => {
  const { session } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!session.user) {
        navigate('/auth');
        return;
      }

      try {
        const { data, error } = await supabase
          .rpc('has_role', { user_id: session.user.id, role: 'admin' });

        if (error) throw error;
        
        setIsAdmin(data);
        setIsLoading(false);
        
        if (!data) {
          // Not an admin, redirect to home
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
        setIsLoading(false);
        navigate('/');
      }
    };

    checkAdminRole();
  }, [session.user, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-wedding-navy" />
            <p className="text-lg text-gray-600">Loading admin dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-6 text-wedding-navy">Admin Dashboard</h1>
          
          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="bookings">Booking Management</TabsTrigger>
              <TabsTrigger value="venues">Venue Management</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bookings">
              <BookingManagement />
            </TabsContent>
            
            <TabsContent value="venues">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Venue Management</h2>
                <p className="text-gray-600">Venue management functionality will be implemented soon.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="users">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">User Management</h2>
                <p className="text-gray-600">User management functionality will be implemented soon.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
