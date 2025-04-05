import { useState } from "react";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Code,
  Github,
} from "lucide-react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Validation and sign in logic here
    console.log("Signing in with:", formData);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <AuthContainer>
      <AuthCard>
        <AuthHeader>
          <Logo>
            <Link to="/">
              <Code size={28} />
              <span>CodeToVideo</span>
            </Link>
          </Logo>
          <AuthTitle>Welcome back</AuthTitle>
          <AuthSubtitle>Sign in to continue creating animations</AuthSubtitle>
        </AuthHeader>

        <AuthForm onSubmit={handleSubmit}>
          <FormGroup>
            <InputLabel>Email Address</InputLabel>
            <InputWrapper>
              <Mail size={18} />
              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </InputWrapper>
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <InputLabel>Password</InputLabel>
            <InputWrapper>
              <Lock size={18} />
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </PasswordToggle>
            </InputWrapper>
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </FormGroup>

          <ForgotPasswordLink href="/forgot-password">
            Forgot password?
          </ForgotPasswordLink>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"} <ArrowRight size={18} />
          </SubmitButton>
        </AuthForm>

        <AuthFooter>
          <span>Don't have an account?</span>
          <AuthLink>
            <Link to="/signup">Sign up now</Link>
          </AuthLink>
        </AuthFooter>

        <Divider>
          <span>OR</span>
        </Divider>

        <SocialAuth>
          <SocialButton type="button">
            <Github size={18} />
            Continue with GitHub
          </SocialButton>
          <SocialButton type="button">
            <GoogleIcon />
            Continue with Google
          </SocialButton>
        </SocialAuth>
      </AuthCard>
    </AuthContainer>
  );
};

export default SignInPage;

const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background);
  padding: 2rem;
`;

const AuthCard = styled.div`
  width: 100%;
  max-width: 480px;
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: 2.5rem;
  box-shadow: var(--shadows-xl);
  border: 1px solid var(--color-border);
`;

const AuthHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Logo = styled.button`
  all: unset;
  margin-bottom: 1.5rem;

  a {
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-primary);
    cursor: pointer;

    span {
      color: var(--color-text-primary);
    }
  }
`;

const AuthTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
`;

const AuthSubtitle = styled.p`
  color: var(--color-text-secondary);
  font-size: 0.875rem;
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InputLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: var(--color-surface-alt);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  padding: 0.75rem 1rem;
  transition: all 0.2s;

  &:focus-within {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
  }

  svg {
    color: var(--color-text-tertiary);
    margin-right: 0.75rem;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  color: var(--color-text-primary);
  font-size: 0.9375rem;
  outline: none;

  &::placeholder {
    color: var(--color-text-tertiary);
  }
`;

const PasswordToggle = styled.button`
  background: transparent;
  border: none;
  color: var(--color-text-tertiary);
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--color-text-secondary);
  }
`;

const ErrorText = styled.span`
  font-size: 0.75rem;
  color: var(--color-error);
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-secondary) 100%
  );
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: var(--radius-lg);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px var(--shadow-md);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const AuthFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-text-tertiary);
  margin: 1.5rem 0;
`;

const AuthLink = styled.span`
  a {
    color: var(--color-primary);
    font-weight: 500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--color-text-tertiary);
  font-size: 0.875rem;
  margin: 1.5rem 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--color-border);
  }
`;

const SocialAuth = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: var(--color-surface-alt);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-lg);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: var(--color-surface);
    border-color: var(--color-border-dark);
  }
`;

// Add this additional styled component:
const ForgotPasswordLink = styled.a`
  display: block;
  text-align: right;
  font-size: 0.875rem;
  color: var(--color-text-tertiary);
  margin-top: -0.5rem;
  margin-bottom: 1rem;
  text-decoration: none;

  &:hover {
    color: var(--color-primary);
    text-decoration: underline;
  }
`;

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M17.64 9.2045C17.64 8.5663 17.5827 7.9527 17.4764 7.3636H9V10.845H13.8436C13.635 11.97 13.0009 12.9231 12.0477 13.5613V15.8195H14.9564C16.6582 14.2527 17.64 11.9454 17.64 9.2045Z"
      fill="#4285F4"
    />
    <path
      d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8372 3.96409 10.71H0.957275V13.0418C2.43818 15.9831 5.48182 18 9 18Z"
      fill="#34A853"
    />
    <path
      d="M3.96409 10.71C3.78409 10.17 3.68182 9.5931 3.68182 9C3.68182 8.4069 3.78409 7.83 3.96409 7.29V4.9582H0.957273C0.347727 6.1731 0 7.5477 0 9C0 10.4523 0.347727 11.8269 0.957273 13.0418L3.96409 10.71Z"
      fill="#FBBC05"
    />
    <path
      d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z"
      fill="#EA4335"
    />
  </svg>
);
