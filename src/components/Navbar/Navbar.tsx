import { useState } from 'react'
import AuthTab from '../auth/AuthTab'
function Navbar() {
  const [visibility, setVisibilitySidebar] = useState("close")
  const [authTabvisibility, setAuthTabvisibility] = useState("close")
  const [authTab, setAuthTab] = useState('login')
  return (
    <div>
      <nav className="h-20 bg-[#141519] drop-shadow-[0_2px_5px_#000000] 
      relative top-0 z-[402] flex items-center justify-between gap-0 pl-3 pr-10 group-data-[theatre=true]/main:!hidden">
  
        <div className='flex grow-0 items-center gap-3'>
          <div className='cursor-pointer text-white'>
            {visibility === 'close' ? ( 
              <svg onClick={ () => setVisibilitySidebar("open") }
                xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-indent-increase"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6l-11 0" /><path d="M20 12l-7 0" /><path d="M20 18l-11 0" /><path d="M4 8l4 4l-4 4" />
              </svg> ) : visibility === 'open' ? (
              <svg  onClick={ () => setVisibilitySidebar("close") }
                  xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeWidth="2"  strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-indent-decrease"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6l-7 0" /><path d="M20 12l-9 0" /><path d="M20 18l-7 0" /><path d="M8 8l-4 4l4 4" />
              </svg>  ) : null}
            </div>
          <img src="/img/pngwing.com.png" width={100} height={50} alt="" />
        </div>

        <div className="flex grow items-center justify-center lg:absolute lg:inset-x-96 lg:inset-y-0">
          <div>
          <input
            className='h-10' 
            type="text" />
          </div>
        </div>

        <div className='text-white flex items-center gap-5'>
          <button onClick={() => {setAuthTabvisibility("open"); setAuthTab("login") }}>Log In</button>
          <button onClick={() => {setAuthTabvisibility("open"); setAuthTab("register")}}>Sign Up</button>
        </div>

      </nav>
      {authTabvisibility === "open" ? (<AuthTab closeAuthTab = {setAuthTabvisibility} tab = {authTab} />):null}

    </div>
  )
}

export default Navbar
