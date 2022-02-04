import React from 'react';

function Header(){
  return(
    <ul className="flex bg-pink-900 p-8">
  <li className="flex-1 mr-2">
    <a className="text-center block rounded hover:border-gray-200 text-white hover:bg-gray-200 py-2 px-4" href="https://eth-gas-tracker-xi.vercel.app/">Gas Tracker</a>
  </li>
  <li className="flex-1 mr-2">
    <a className="text-center block rounded hover:border-gray-200 text-white hover:bg-gray-200 py-2 px-4" href="https://minter-app-ravinthiranpartheepan1407.vercel.app/">DAO</a>
  </li>
  <li className="text-center flex-1">
    <a className="text-center block rounded hover:border-gray-200 text-white hover:bg-gray-200 py-2 px-4" href="#">DeFi</a>
  </li>
  <li className="text-center flex-1">
    <a className="text-center block rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4" href="/">Home</a>
  </li>

</ul>
  )
}

export default Header;
