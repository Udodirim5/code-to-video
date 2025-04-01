import { Check, Zap, Code, Users, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import styled from 'styled-components';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // Fixed: simple string state
  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for trying out basic features',
      cta: 'Get Started',
      featured: false,
      features: [
        '2 videos per day',
        '720p resolution',
        'Basic themes',
        'Watermark on exports',
        'Community support'
      ],
      icon: <Code />
    },
    {
      name: 'Starter',
      price: billingCycle === 'yearly' ? '8' : '10',
      description: 'For individual creators getting started',
      cta: 'Start Free Trial',
      featured: false,
      features: [
        '10 videos per day',
        '1080p resolution',
        'Premium themes',
        'No watermark',
        'Email support',
        'Custom branding'
      ],
      icon: <Zap />
    },
    {
      name: 'Pro',
      price: billingCycle === 'yearly' ? '16' : '20',
      description: 'For professionals and power users',
      cta: 'Start Free Trial',
      featured: true,
      features: [
        '50 videos per day',
        '4K resolution',
        'All premium themes',
        'Priority support',
        'Advanced analytics',
        'API access',
        'Custom fonts'
      ],
      icon: <Zap />
    },
    {
      name: 'Team',
      price: billingCycle === 'yearly' ? '40' : '50',
      description: 'For teams and organizations',
      cta: 'Contact Sales',
      featured: false,
      features: [
        'Unlimited videos',
        '4K resolution',
        'All premium features',
        'Dedicated support',
        'Team collaboration',
        'SSO & advanced security',
        'Custom SLAs'
      ],
      icon: <Users />
    }
  ];

  const handleBillingChange = (cycle) => {
    setBillingCycle(cycle);
  };

  return (
    <PricingContainer>
      <PricingHeader>
        <h1>Simple, transparent pricing</h1>
        <p>Choose the plan that fits your needs. Start free, upgrade anytime.</p>
        
        <ToggleContainer>
          <ToggleButton 
            active={billingCycle === 'monthly'}
            onClick={() => handleBillingChange('monthly')}
          >
            Monthly
          </ToggleButton>
          <ToggleButton 
            active={billingCycle === 'yearly'}
            onClick={() => handleBillingChange('yearly')}
          >
            Yearly <SaveBadge>Save 20%</SaveBadge>
          </ToggleButton>
        </ToggleContainer>
      </PricingHeader>

      <PlansGrid>
        {plans.map((plan, index) => (
          <PlanCard key={index} featured={plan.featured}>
            {plan.featured && <PopularBadge>Most Popular</PopularBadge>}
            <PlanHeader>
              <PlanIcon>{plan.icon}</PlanIcon>
              <PlanName>{plan.name}</PlanName>
              <PlanPrice>
                ${plan.price}<small>/mo</small>
              </PlanPrice>
              <PlanDescription>{plan.description}</PlanDescription>
            </PlanHeader>
            
            <PlanFeatures>
              {plan.features.map((feature, i) => (
                <FeatureItem key={i}>
                  <Check size={16} />
                  <span>{feature}</span>
                </FeatureItem>
              ))}
            </PlanFeatures>
            
            <PlanButton featured={plan.featured}>
              {plan.cta} {plan.name !== 'Team' && <ArrowRight size={16} />}
            </PlanButton>
          </PlanCard>
        ))}
      </PlansGrid>


      <EnterpriseSection>
        <h2>Need enterprise-grade features?</h2>
        <p>Custom solutions for large organizations with specialized requirements.</p>
        <EnterpriseButton>
          Contact Sales <ArrowRight size={16} />
        </EnterpriseButton>
      </EnterpriseSection>

      <FAQSection>
        <h2>Frequently Asked Questions</h2>
        <FAQGrid>
          <FAQItem>
            <h3>Can I switch plans later?</h3>
            <p>Yes, you can upgrade or downgrade at any time. We'll prorate the difference.</p>
          </FAQItem>
          <FAQItem>
            <h3>Is there a free trial?</h3>
            <p>All paid plans come with a 14-day free trial. No credit card required.</p>
          </FAQItem>
          <FAQItem>
            <h3>What payment methods do you accept?</h3>
            <p>We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
          </FAQItem>
          <FAQItem>
            <h3>How do I cancel my subscription?</h3>
            <p>You can cancel anytime from your account settings with just a few clicks.</p>
          </FAQItem>
        </FAQGrid>
      </FAQSection>
    </PricingContainer>
  );
};

// Styled Components
const PricingContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-12) var(--space-6);
`;

const PricingHeader = styled.div`
  text-align: center;
  margin-bottom: var(--space-12);

  h1 {
    font-size: var(--font-size-3xl);
    margin-bottom: var(--space-3);
    background: linear-gradient(90deg, var(--color-text-primary), var(--color-primary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: var(--color-text-secondary);
    max-width: 600px;
    margin: 0 auto var(--space-6);
    font-size: var(--font-size-lg);
  }
`;

const ToggleContainer = styled.div`
  display: inline-flex;
  background: var(--color-surface-alt);
  border-radius: var(--radius-full);
  padding: var(--space-1);
  margin: 0 auto;
  border: 1px solid var(--color-border);
`;

const ToggleButton = styled.button`
  position: relative;
  border: none;
  background: ${({ active }) => active ? 'var(--color-surface)' : 'transparent'};
  color: ${({ active }) => active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'};
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  transition: all var(--transition-base);
`;

const SaveBadge = styled.span`
  background: var(--color-primary);
  color: white;
  font-size: var(--font-size-xs);
  padding: 2px var(--space-2);
  border-radius: var(--radius-full);
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-12);
`;

const PlanCard = styled.div`
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  border: 1px solid ${({ featured }) => 
    featured ? 'var(--color-primary)' : 'var(--color-border)'};
  position: relative;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
  display: flex;
  flex-direction: column;

  ${({ featured }) => featured && `
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(138, 110, 255, 0.2);
  `}

  &:hover {
    transform: ${({ featured }) => featured ? 'scale(1.08)' : 'translateY(-5px)'};
    box-shadow: var(--shadow-lg);
  }
`;

const PopularBadge = styled.div`
  position: absolute;
  top: -12px;
  right: var(--space-6);
  background: var(--color-primary);
  color: white;
  font-size: var(--font-size-xs);
  font-weight: 600;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
`;

const PlanHeader = styled.div`
  text-align: center;
  margin-bottom: var(--space-6);
  flex: 1;
`;

const PlanIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  background: rgba(138, 110, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-3);
  color: var(--color-primary);
`;

const PlanName = styled.h2`
  font-size: var(--font-size-xl);
  margin: 0 0 var(--space-2) 0;
`;

const PlanPrice = styled.div`
  font-size: var(--font-size-3xl);
  font-weight: 700;
  margin: 0 0 var(--space-1) 0;

  small {
    font-size: var(--font-size-base);
    font-weight: 400;
    color: var(--color-text-secondary);
  }
`;

const PlanDescription = styled.p`
  color: var(--color-text-secondary);
  margin: 0;
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 var(--space-6) 0;
  flex: 2;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  padding: var(--space-2) 0;
  color: var(--color-text-secondary);

  svg {
    color: var(--color-primary);
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const PlanButton = styled.button`
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  border: none;
  background: ${({ featured }) => 
    featured 
      ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)' 
      : 'var(--color-surface-alt)'};
  color: ${({ featured }) => featured ? 'white' : 'var(--color-text-primary)'};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ featured }) => 
      featured ? '0 4px 15px rgba(138, 110, 255, 0.4)' : 'var(--shadow-sm)'};
  }
`;

const EnterpriseSection = styled.div`
  text-align: center;
  background: var(--color-surface-alt);
  border-radius: var(--radius-xl);
  padding: var(--space-8) var(--space-6);
  margin-bottom: var(--space-12);

  h2 {
    font-size: var(--font-size-xl);
    margin-bottom: var(--space-2);
  }

  p {
    color: var(--color-text-secondary);
    max-width: 600px;
    margin: 0 auto var(--space-4);
  }
`;

const EnterpriseButton = styled.button`
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  transition: all var(--transition-base);

  &:hover {
    background: rgba(138, 110, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const FAQSection = styled.div`
  h2 {
    text-align: center;
    font-size: var(--font-size-xl);
    margin-bottom: var(--space-6);
  }
`;

const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
`;

const FAQItem = styled.div`
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  border: 1px solid var(--color-border);

  h3 {
    font-size: var(--font-size-base);
    margin: 0 0 var(--space-2) 0;
  }

  p {
    color: var(--color-text-secondary);
    margin: 0;
    font-size: var(--font-size-sm);
  }
`;

export default PricingPage;