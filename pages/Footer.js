import React from 'react';

function Footer(){
  return(
    <footer className="bg-pink-900 p-8 text-center text-white">
    <div className="container p-6">
      <div>
        <p className="flex justify-center items-center">
          <span className="mr-4">Join My Test DAO App</span>
          <a type="button" className="inline-block px-6 py-2 border-2 border-white text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" href="https://minter-app-ravinthiranpartheepan1407.vercel.app/">
            DAO
            </a>
        </p>
      </div>
    </div>

    <div className="text-center p-4">
      © 2021 Copyright:
      <a className="text-white" href="/">Developed By Ravinthiran Partheepan</a>
    </div>
    </footer>
  )
}

export default Footer;
