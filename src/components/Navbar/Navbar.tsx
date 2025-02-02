import { useState } from 'react';
import AuthTab from '../auth/AuthTab';

function Navbar() {
  const [visibility, setVisibilitySidebar] = useState("close");
  const [authTabvisibility, setAuthTabvisibility] = useState("close");
  const [authTab, setAuthTab] = useState('login');

  return (
    <nav className="h-20 bg-[#141519] drop-shadow-[0_2px_5px_#000000] relative top-0 z-50 flex items-center justify-between pl-6 pr-20">
      
      <div className="flex items-center gap-4">
        <div className="cursor-pointer text-white">
          {visibility === 'close' ? (
            <svg
              onClick={() => setVisibilitySidebar("open")}
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-indent-increase"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M20 6l-11 0" />
              <path d="M20 12l-7 0" />
              <path d="M20 18l-11 0" />
              <path d="M4 8l4 4l-4 4" />
            </svg>
          ) : (
            <svg
              onClick={() => setVisibilitySidebar("close")}
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-indent-decrease"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M20 6l-7 0" />
              <path d="M20 12l-9 0" />
              <path d="M20 18l-7 0" />
              <path d="M8 8l-4 4l4 4" />
            </svg>
          )}
        </div>
        <img src="/img/pngwing.com.png" width={100} height={50} alt="Logo" />
      </div>

      <div className="flex-1 flex justify-center">
        <div className='w-[512px] relative'>
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white icon icon-tabler icons-tabler-outline icon-tabler-search"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
          <path d="M21 21l-6 -6" />
        </svg>
        <input
          className="bg-black w-full pl-10 pr-3 py-1 rounded-xl outline-none border-neutral-800 border-2 text-white pt-1.5 pb-1.5 font-normal"
          type="text"
          placeholder="Buscar..."
        />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          className="cursor-pointer text-white border-white border-2"
          onClick={() => {
            setAuthTabvisibility("open");
            setAuthTab("login");
          }}>
          Log In
        </button>
        <button
          className="cursor-pointer text-white"
          onClick={() => {
            setAuthTabvisibility("open");
            setAuthTab("register");
          }}>
          Sign Up
        </button>
      </div>

      {/* Modal de autenticación */}
      {authTabvisibility === "open" && <AuthTab closeAuthTab={setAuthTabvisibility} tab={authTab} />}
    </nav>
  );
}

export default Navbar;
