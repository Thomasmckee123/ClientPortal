import { useNavigate } from 'react-router-dom';
import ApplicationsOptions from './ApplicationsOptions';
import PriceOptions from './PriceOptions';
import Button from '../../../components/Button/Button';

const Header = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-4 pt-24 pb-8">
      <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 text-center leading-tight">
        Stop Losing Clients
      </h1>
      <h2 className="text-5xl sm:text-6xl font-bold text-indigo-600 text-center leading-tight">
        In your inbox
      </h2>
      <p className="max-w-xl text-center text-gray-500 text-lg mt-4">
        A clean, branded portal for every client. Share files, send updates
        and get paid -- all in one place.
      </p>
    </div>
  );
};

const Options = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row gap-4">
      <Button
        onClick={() => navigate('/signup')}
        className="px-6 py-2.5"
      >
        Start for free
      </Button>
      <Button
        variant="secondary"
        onClick={() => navigate('/login')}
        className="px-6 py-2.5"
      >
        Sign in
      </Button>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50/30 to-white">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600">ClientPortal</span>
          <Options />
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-6">
        <Header />
        <div className="flex items-center justify-center pb-16">
          <Options />
        </div>
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Everything your clients need
          </h2>
          <p className="text-center text-gray-500 mb-10">
            One place for files, tasks, messages, and invoices.
          </p>
          <ApplicationsOptions />
        </div>
        <PriceOptions />
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-lg font-bold text-indigo-600">ClientPortal</span>
            <p className="text-sm text-gray-400">
              Built for freelancers and agencies who care about client experience.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
