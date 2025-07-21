import React, { useMemo } from 'react';
import { Check, X } from 'lucide-react';

// Utility functions
const calculateStrength = (password = '') => {
  let score = 0;
  if (password.length >= 6) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

const strengthColorMap = [
  'bg-red-500',
  'bg-red-400',
  'bg-yellow-500',
  'bg-yellow-400',
  'bg-green-500',
];

const strengthLabelMap = [
  'Very Weak',
  'Weak',
  'Fair',
  'Good',
  'Strong',
];

// Password criteria component
const PasswordCriteria = ({ password = '' }) => {
  const criteriaList = useMemo(
    () => [
      { label: 'At least 6 characters', met: password.length >= 6 },
      { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
      { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
      { label: 'Contains a number', met: /\d/.test(password) },
      { label: 'Contains special character', met: /[^A-Za-z0-9]/.test(password) },
    ],
    [password]
  );

  return (
    <div className="mt-2 space-y-1">
      {criteriaList.map(({ label, met }) => (
        <div key={label} className="flex items-center text-xs">
          {met ? (
            <Check className="size-4 text-green-500 mr-2" />
          ) : (
            <X className="size-4 text-gray-500 mr-2" />
          )}
          <span className={met ? 'text-green-500' : 'text-gray-400'}>{label}</span>
        </div>
      ))}
    </div>
  );
};

// Strength meter component
const PasswordStrengthMeter = ({ password = '' }) => {
  const safePassword = password || '';
  const strength = useMemo(() => calculateStrength(safePassword), [safePassword]);
  const color = strengthColorMap[Math.min(strength, strengthColorMap.length - 1)];
  const label = strengthLabelMap[Math.min(strength, strengthLabelMap.length - 1)];

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">Password strength</span>
        <span className="text-xs text-gray-400">{label}</span>
      </div>

      <div className="flex space-x-1">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${index < strength ? color : 'bg-gray-600'
              }`}
          />
        ))}
      </div>

      <PasswordCriteria password={safePassword} />
    </div>
  );
};

export default PasswordStrengthMeter;

