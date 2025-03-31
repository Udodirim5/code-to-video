import { AlertCircle, Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ErrorPage = () => {
  const navigate = useNavigate();
  const errorMessage = "Something went wrong. Please try again later.";

  return (
    <ErrorContainer>
      <ErrorContent>
        <ErrorIcon>
          <AlertCircle size={48} />
        </ErrorIcon>
        <ErrorTitle>Oops! Something went wrong</ErrorTitle>
        <ErrorDescription>
          {errorMessage}
        </ErrorDescription>
        
        <ErrorActions>
          <ErrorButton onClick={() => navigate(-1)}>
            <ArrowLeft size={18} /> Go Back
          </ErrorButton>
          <ErrorButton primary onClick={() => navigate('/')}>
            <Home size={18} /> Return Home
          </ErrorButton>
        </ErrorActions>

        {import.meta.env.DEV && (
          <ErrorDetails>
            <DetailsTitle>Error Details (Development Only)</DetailsTitle>
            <DetailsContent>
              mess
            </DetailsContent>
          </ErrorDetails>
        )}
      </ErrorContent>
    </ErrorContainer>
  );
};

export default ErrorPage;

// Styled Components
const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
  padding: var(--space-8);
`;

const ErrorContent = styled.div`
  max-width: 560px;
  text-align: center;
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: var(--space-12);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--color-border);
`;

const ErrorIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(250, 82, 82, 0.1);
  color: var(--color-error);
  margin-bottom: var(--space-6);
`;

const ErrorTitle = styled.h1`
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
`;

const ErrorDescription = styled.p`
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
  line-height: 1.6;
  margin-bottom: var(--space-8);
`;

const ErrorActions = styled.div`
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
`;

const ErrorButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background: ${(props) =>
    props.primary
      ? `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`
      : 'var(--color-surface-alt)'};
  color: ${(props) => (props.primary ? 'white' : 'var(--color-text-primary)')};
  border: ${(props) => (props.primary ? 'none' : '1px solid var(--color-border)')};
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-quick);

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) =>
      props.primary ? '0 4px 15px var(--color-primary)40' : 'var(--shadow-sm)'};
  }
`;

const ErrorDetails = styled.div`
  margin-top: var(--space-12);
  text-align: left;
  background: var(--color-surface-alt);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  border: 1px solid var(--color-border);
`;

const DetailsTitle = styled.h3`
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-4);
`;

const DetailsContent = styled.pre`
  font-family: var(--font-mono);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
`;
