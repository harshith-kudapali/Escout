import { Link } from "react-router-dom";
import SignUpForm from "../../components/auth/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-base-100 text-neutral">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-30 w-auto" src="/FragNation-high-resolution-logo-transparent.png" alt="FragNation" />
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-md bg-base-200">
        <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10 bg-secondary">
          <SignUpForm />
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-info background-transparent"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-secondary text-white text-info">Already have an account?</span>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-400 hover:to-pink-400"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
