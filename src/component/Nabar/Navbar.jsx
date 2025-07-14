import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <div className='flex justify-around items-center p-3 fixed w-full top-0  bg-[#574cef] bg'>
        <div className=''>
          <h1 className='text-white font-bold'>Productivity_DashBoards</h1>
        </div>
        <div>
          <ul className='flex items-center gap-3 text-white '>
            {/* <li>
              <Link to='/'>Dashboard</Link>
            </li> */}
            <li className='hover:text-[#d0c4e6]'>
              <Link to='/'>DailyTasks</Link>
            </li>
            <span className='text-[#8245ec] font-bold text-2xl'>||</span>
            <li className='hover:text-[#d0c4e6]'>
              <Link to='/CalenderView'>CalenderView</Link>
            </li>
            <span className='text-[#8245ec] font-bold text-2xl'>||</span>

            <li className='hover:text-[#d0c4e6]'>
              <Link to='/Notes'>Notes</Link>
            </li>
            <span className='text-[#8245ec] font-bold text-2xl'>||</span>

            <li className='hover:text-[#d0c4e6]'>
              <Link to='/FocusTimer'>FocusTimer</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Navbar;
