'use client';

import Link from 'next/link';

import { IoPersonAddOutline, IoLogoGitlab } from 'react-icons/io5';
import { useSession } from 'next-auth/react';

const LoginIcon = () => {
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  return (
    <Link href="auth/login" className="mx-2">
      {isAuthenticated ? (
        <div className="font-bold text-white text-sm">
          {session?.user?.name}
          {/* <IoLogoGitlab/> */}
        </div>
      ) : (
        <IoPersonAddOutline className="text-white w-6 h-6" />
      )}
    </Link>
  );
};

export default LoginIcon;
