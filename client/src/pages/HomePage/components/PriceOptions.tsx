import { useNavigate } from 'react-router-dom';

const priceOptionsData = [
  {
    title: 'Free',
    price: '£0',
    features: ['1 client portal', 'File sharing', 'Basic Messaging'],
  },
  {
    title: 'Pro',
    price: '£12',
    features: ['Unlimited Portals', 'Custom Branding', 'Invoicing + Stripe'],
    popular: true,
  },
  {
    title: 'Agency',
    price: '£29',
    features: ['Everything in Pro', 'Team Members', 'Priority Support'],
  },
];

const PriceOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
        Simple, transparent pricing
      </h2>
      <p className="text-center text-gray-500 mb-10">
        Start free. Upgrade when you need more.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {priceOptionsData.map((option) => (
          <div
            key={option.title}
            className={`flex flex-col items-start p-6 rounded-xl border-2 ${
              option.popular
                ? 'border-blue-500 relative'
                : 'border-gray-200'
            }`}
          >
            {option.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                Popular
              </span>
            )}
            <div className="font-semibold text-lg">{option.title}</div>
            <span className="flex items-center mt-2">
              <p className="font-bold text-3xl text-gray-900">
                {option.price}
              </p>
              <span className="text-gray-500 ml-1">/mo</span>
            </span>
            <ul className="mt-4 space-y-2 w-full">
              {option.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center text-sm text-gray-600"
                >
                  <svg
                    className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate('/signup')}
              className={`mt-6 w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                option.popular
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceOptions;
