import applicationsOptions from '../utils/applicationOptions';

const ApplicationsOptions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {applicationsOptions.map((option, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 border border-gray-300 rounded-lg p-6"
        >
          <div>{option.icon}</div>
          <div>{option.title}</div>
          <div>{option.description}</div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationsOptions;
