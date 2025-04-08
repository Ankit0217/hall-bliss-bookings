
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Admin key
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    // Create or update the demo account
    const { data: existingUser, error: checkError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (checkError) {
      throw checkError;
    }

    // Check if the demo user already exists
    const demoUser = existingUser.users.find(user => user.email === "demo@hallbliss.com");

    if (!demoUser) {
      // Create the demo account if it doesn't exist
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: "demo@hallbliss.com",
        password: "demo12345",
        email_confirm: true,
      });

      if (error) {
        throw error;
      }

      console.log("Demo account created:", data);
    } else {
      console.log("Demo account already exists");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Demo account setup completed" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error setting up demo account:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
