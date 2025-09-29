import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-900 text-center">Create your account</h1>

          {/* Place your existing form here; handlers unchanged */}
          {/* <form onSubmit={handleSignUp}> ... </form> */}

          <p className="mt-6 text-center text-sm text-gray-600">
            already have an account ?{' '}
            <Link to="/auth/sign-in" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign-In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}


