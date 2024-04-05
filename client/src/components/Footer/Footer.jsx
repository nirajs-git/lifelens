import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center bg-green py-8 ">
      <div className="flex flex-col items-center gap-4 max-md:mt-4">
        <div className="text-sm text-center text-white font-mulish">
          Copyright © <Link className="btn-transition hover:text-dark" to='/'>LifeLens</Link>. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
