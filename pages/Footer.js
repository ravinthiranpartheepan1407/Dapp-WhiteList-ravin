import React from 'react';

function Footer(){
  return(
    <footer class="bg-pink-900 p-8 text-center text-white">
    <div class="container p-6">
      <div class="">
        <p class="flex justify-center items-center">
          <span class="mr-4">Join My Test DAO App</span>
          <a type="button" class="inline-block px-6 py-2 border-2 border-white text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" href="https://minter-app-ravinthiranpartheepan1407.vercel.app/">
            DAO
            </a>
        </p>
      </div>
    </div>

    <div class="text-center p-4">
      © 2021 Copyright:
      <a class="text-white" href="/">Developed By Ravinthiran Partheepan</a>
    </div>
    </footer>
  )
}

export default Footer;
