
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from './context/AuthContext';
import Navbar from "./components/Navbar/Navbar";

function App(){


  return (           
    <div className=" w-screen h-screen bg-[#141517] relative">          
    <AuthProvider>
              
      <Navbar/>
      <AppRoutes/>
    </AuthProvider>
    </div>   
  );
}

export default App;
