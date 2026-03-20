import Button from '../../../components/Button/Button';

const priceOptionsData = [
  {
    title: 'Free',
    price: '£0',
    features: ['1 client portal', 'file sharing', 'Basic Messaging'],
  },
  {
    title: 'Pro',
    price: '£12',
    features: ['Unlimited Portals', 'Custom Branding', 'Invoicing + Stripe'],
  },
  {
    title: 'Agency',
    price: '£29',
    features: ['Everything in Prop', 'Team Members', 'Priority Support'],
  },
];

const PriceOptions = () => {
  return (
    <div className="flex justify-start gap-60 m-10">
      {priceOptionsData.map((option) => (
        <div
          key={option.title}
          className="flex flex-col items-start w-50 p-4 rounded-lg border border-blue-300"
        >
          <div className="font-semibold text-lg">{option.title}</div>
          <span className="flex items-center">
            <p className="font-medium text-2xl text-blue-600">{option.price}</p>
            /mo
          </span>
          {option.features.map((feature) => (
            <div
              key={feature}
              className="w-full text-start text-gray-500 border-b border-gray-300 py-1 text-sm"
            >
              {feature}
            </div>
          ))}
          <Button
            text={'Get Started'}
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}
            className="mt-4 bg-white text-gray-900 rounded-2xl px-4 py-2 hover:bg-gray-300 border border-gray-300 transition-colors"
          />
        </div>
      ))}
    </div>
  );
};

export default PriceOptions;
