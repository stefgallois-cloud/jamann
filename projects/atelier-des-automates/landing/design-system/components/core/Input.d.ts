export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'search';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  /** Icône préfixe (string ou ReactNode) */
  icon?: React.ReactNode;
}
