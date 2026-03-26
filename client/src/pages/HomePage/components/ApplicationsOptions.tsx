import applicationsOptions from '../utils/applicationOptions';

const ApplicationsOptions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {applicationsOptions.map((option, index) => (
        <div
          key={index}
          className="flex flex-col gap-3 bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
        >
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            {option.icon}
          </div>
          <h3 className="font-semibold text-gray-900">{option.title}</h3>
          <p className="text-sm text-gray-500">{option.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ApplicationsOptions;
