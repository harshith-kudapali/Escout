import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";
import FloatingIcons from "../../components/FloatingIcons";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-base-100 text-neutral relative">
      {/* Ensure FloatingIcons is positioned above the rest */}
      <FloatingIcons className="absolute z-50" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-30 w-auto"
          src="/FragNation-high-resolution-logo-transparent.png"
          alt="FragNation"
        />
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-md bg-base-200 relative z-10">
        <div className="bg-secondary py-8 px-4 sm:rounded-lg sm:px-10 glowing-border-animated">
          <LoginForm />
          <div className="bg-secondary mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-info background-transparent"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-secondary text-white text-info">
                  New to FragNation?
                </span>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to="/signup"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-400 hover:to-pink-400"
              >
                Join now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          .glowing-border-animated {
            animation: glow 5s infinite;
          }

          @keyframes glow {
            0% {
              box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); /* blue-500 */
            }
            50% {
              box-shadow: 0 0 10px rgba(108, 99, 255, 1); /* purple-500 */
            }
            100% {
              box-shadow: 0 0 15px rgba(59, 130, 246, 0.5); /* blue-500 */
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;
