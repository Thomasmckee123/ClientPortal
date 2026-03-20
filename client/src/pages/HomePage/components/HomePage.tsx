import Button from '../../../components/Button/Button';
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
      <div className="w-full flex items-center justify-center  flex-col gap-4">
        <div className="flex items-center h-15 w-130 text-wrap">
          A clean, branded portal for every client. Share files, send updates
          and get paid -- all in one place
        </div>
      </div>
    </>
  );
};
const Options = () => {
  return (
    <div className="flex flex-row gap-4">
      <Button
        text="Start for free"
        className="bg-white text-gray-800 border border-gray-400 rounded-2xl cursor-pointer hover:bg-gray-100"
        onClick={() => {}}
      />
      <Button
        text="See How it works"
        className="bg-white text-gray-800 border border-gray-400 rounded-2xl cursor-pointer hover:bg-gray-100"
        onClick={() => {}}
      />
    </div>
  );
};
const HomePage = () => {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-25">
        <Options />
      </div>
      <ApplicationsOptions />
      <PriceOptions />
    </>
  );
};

export default HomePage;
