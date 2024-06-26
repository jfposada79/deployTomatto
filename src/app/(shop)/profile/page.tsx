import { auth } from '@/auth.config';
import { Title } from '@/components';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    // redirect('/auth/login?returnTo=/perfil');
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <Title title="Perfil" />

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM10 3a3 3 0 110 6 3 3 0 010-6zm0 15c-3.866 0-7-3.134-7-7 0-1.657 1.086-3.065 2.596-4.042A5.972 5.972 0 0010 9c1.6 0 3.075.62 4.204 1.643A6.963 6.963 0 0017 11c0 3.866-3.134 7-7 7z" />
            </svg>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700">Nombre: {session.user.name}</h2>
            <p className="text-gray-600">Email: {session.user.email}</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-3xl text-center text-gray-800">{session.user.role}</h3>
        </div>
      </div>
    </div>
  );
}
