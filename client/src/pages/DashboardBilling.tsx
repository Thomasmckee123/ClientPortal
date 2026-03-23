import { useState } from 'react';

const plans = [
  {
    name: 'Free',
    price: '£0',
    period: '/mo',
    features: ['1 client portal', 'File sharing', 'Basic messaging'],
    current: true,
  },
  {
    name: 'Pro',
    price: '£12',
    period: '/mo',
    features: [
      'Unlimited portals',
      'Custom branding',
      'Invoicing + Stripe payments',
      'PDF invoice generation',
    ],
    current: false,
    popular: true,
  },
  {
    name: 'Agency',
    price: '£29',
    period: '/mo',
    features: [
      'Everything in Pro',
      'Team members',
      'Priority support',
      'Client activity log',
    ],
    current: false,
  },
];

export default function DashboardBilling() {
  const [currentPlan, setCurrentPlan] = useState('Free');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your subscription and payment methods
        </p>
      </div>

      {/* Current Plan */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          Current Plan
        </h2>
        <p className="text-2xl font-bold text-gray-900 mt-2">{currentPlan}</p>
        <p className="text-sm text-gray-500 mt-1">
          {currentPlan === 'Free'
            ? 'You are on the free tier. Upgrade to unlock more features.'
            : `Your ${currentPlan} subscription is active.`}
        </p>
      </div>

      {/* Plan Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white rounded-xl border-2 p-6 relative ${
              currentPlan === plan.name
                ? 'border-blue-500'
                : 'border-gray-200'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                Popular
              </span>
            )}
            <h3 className="text-lg font-semibold text-gray-900">
              {plan.name}
            </h3>
            <div className="mt-2">
              <span className="text-3xl font-bold text-gray-900">
                {plan.price}
              </span>
              <span className="text-gray-500">{plan.period}</span>
            </div>
            <ul className="mt-4 space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center text-sm text-gray-600">
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
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setCurrentPlan(plan.name)}
              className={`mt-6 w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPlan === plan.name
                  ? 'bg-gray-100 text-gray-500 cursor-default'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              disabled={currentPlan === plan.name}
            >
              {currentPlan === plan.name ? 'Current Plan' : 'Upgrade'}
            </button>
          </div>
        ))}
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          Payment Method
        </h2>
        <p className="text-sm text-gray-500">
          No payment method on file.{' '}
          <button className="text-blue-600 hover:underline">
            Add a payment method
          </button>{' '}
          to upgrade your plan.
        </p>
      </div>
    </div>
  );
}
