import React from 'react';
import { Link } from 'react-router-dom';

interface StyledLinkProps {
  to: string;
  children: React.ReactNode;
}

function StyledLink({ to, children }: StyledLinkProps) {
  return (
    <Link 
      to={to} 
      className="
        inline-flex items-center
        px-4 py-2 mt-4
        text-sm font-medium
        text-indigo-600 dark:text-indigo-400
        bg-transparent
        border border-indigo-600 dark:border-indigo-400
        rounded-md
        hover:bg-indigo-600 hover:text-white
        dark:hover:bg-indigo-400 dark:hover:text-gray-900
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
      "
    >
      {children}
    </Link>
  );
}

export default StyledLink;
