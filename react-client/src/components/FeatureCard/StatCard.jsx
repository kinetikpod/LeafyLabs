import { BarChart3 } from 'lucide-react';
import FeatureCard from './FeatureCard';

const StatCard = () => {
  return (
    <FeatureCard
      targetPath="stat"
      title="Statistics"
      subtitle="automated for speed"
      subtitleColor="text-amber-500"
      icon={<BarChart3 className="w-8 h-8" />}
      iconColor="text-amber-400"
      borderColor="border-amber-500"
      buttonColor="bg-amber-600"
      buttonHoverColor="bg-amber-700"
      features={[
        'Two-group test',
        'More than two groups',
        'Chi-square test',
        '...and more',
      ]}
      id="statCard"
    />
  );
};

export default StatCard;

