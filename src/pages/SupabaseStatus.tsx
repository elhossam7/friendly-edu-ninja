import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const SupabaseStatus = () => {
  const [status, setStatus] = useState('Checking connection...');

  useEffect(() => {
    const checkConnection = async () => {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .limit(1);
      if (error) {
        setStatus('Error: ' + error.message);
      } else {
        setStatus('Connected successfully');
      }
    };
    checkConnection();
  }, []);

  return (
    <div>
      <h1>Supabase Connection Status</h1>
      <p>{status}</p>
    </div>
  );
};

export default SupabaseStatus;
