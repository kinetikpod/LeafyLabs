import { BrainCircuit } from 'lucide-react';
import FeatureCard from './FeatureCard';
import useAuthUser from '../../hooks/useAuthUser';


const MLCard = () => {
  const { authUser } = useAuthUser()
  return (
    <FeatureCard
      title="Machine Learning"
      subtitle="trained for insights"
      subtitleColor="text-purple-500"
      icon={<BrainCircuit className="w-8 h-8" />}
      iconColor="text-purple-500"
      borderColor="border-purple-500"
      buttonColor="bg-purple-600"
      buttonHoverColor="bg-purple-700"
      features={[
        'Classification',
        'Regression',
        'Model explainability',
        '...and more',
      ]}
      targetPath={authUser ? "/ml" : "/login"}
      id="mlCard"
    />
  );
};

export default MLCard;

