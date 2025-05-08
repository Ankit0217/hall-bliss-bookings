
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const NavbarAdminLink = () => {
  const { session } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!session?.user) {
        setIsAdmin(false);
        return;
      }

      try {
        console.log('NavbarAdminLink: Checking admin role for user ID:', session.user.id);
        const { data, error } = await supabase
          .rpc('has_role', { user_id: session.user.id, role: 'admin' });

        console.log('NavbarAdminLink: Admin role check result:', { data, error });
        
        if (error) throw error;
        setIsAdmin(!!data);
      } catch (error) {
        console.error('NavbarAdminLink: Error checking admin role:', error);
        setIsAdmin(false);
      }
    };

    checkAdminRole();
  }, [session?.user]);

  if (!isAdmin) {
    return null;
  }

  return (
    <Link
      to="/admin"
      className="text-gray-700 hover:text-wedding-navy transition-colors py-2 px-3 rounded-md hover:bg-gray-100"
    >
      Admin Dashboard
    </Link>
  );
};

export default NavbarAdminLink;
