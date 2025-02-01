import { useEffect, useState } from 'react';
import api from '../utils/network';
import { useAuth } from '../context/AuthContext';

function Protected () {
  const [message, setMessage] = useState<string | null>(null);
  const { user } = useAuth();
  const fetchSendCode = async () => {
    try {
      await api.get('/protected');
      setMessage('✅ Petición exitosa');
    } catch {
      setMessage(' Error en la petición');
    }
  };

  useEffect(() => {
    fetchSendCode();
  }, []);

  return (
    <div>
      <button onClick={fetchSendCode}>Enviar Petición</button>
      {message && <p>{message}</p>}
      {user?.email}
    </div>
  );
}

export default Protected;
