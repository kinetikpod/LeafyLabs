import { Sparkles } from 'lucide-react';
import FeatureCard from './FeatureCard';

const AICard = () => {
  return (
    <FeatureCard
      targetPath="ai"
      title="AI Assistant"
      subtitle="smart & conversational"
      subtitleColor="text-fuchsia-500"
      icon={<Sparkles className="w-8 h-8" />}
      iconColor="text-fuchsia-500"
      borderColor="border-fuchsia-500"
      buttonColor="bg-fuchsia-600"
      buttonHoverColor="bg-fuchsia-700"
      features={[
        'Chat with your data',
        'Retrieve relevant knowledge',
        'Summarize + answer',
        '...and more',
      ]}
      id="aiCard"
    />
  );
};

export default AICard;

