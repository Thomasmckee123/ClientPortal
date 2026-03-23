import { useNavigate } from 'react-router-dom';
import ApplicationsOptions from './ApplicationsOptions';
import PriceOptions from './PriceOptions';

const Header = () => {
  return (
    <>
      <div className="flex items-center justify-center h-96 flex-col gap-4">
        <h1 className="text-6xl font-medium text-gray-800">
          Stop Losing Clients
        </h1>
        <h1 className="text-6xl text-blue-600 font-medium">In your inbox</h1>
      </div>
      <div className="w-full flex items-center justify-center flex-col gap-4">
        <div className="flex items-center h-15 w-130 text-wrap">
          A clean, branded portal for every client. Share files, send updates
          and get paid -- all in one place
        </div>
      </div>
    </>
  );
};

const Options = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row gap-4">
      <button
        onClick={() => navigate('/signup')}
        className="px-4 py-2 bg-blue-600 text-white rounded-2xl cursor-pointer hover:bg-blue-700 transition-colors"
      >
        Start for free
      </button>
      <button
        onClick={() => navigate('/login')}
        className="px-4 py-2 bg-white text-gray-800 border border-gray-400 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors"
      >
        Sign in
      </button>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">ClientPortal</span>
          <Options />
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-6">
        <Header />
        <div className="flex items-center justify-center h-25">
          <Options />
        </div>
        <ApplicationsOptions />
        <PriceOptions />
      </div>
    </div>
  );
};

export default HomePage;
