export interface CardProps {
  children: React.ReactNode;
  /** Variante visuelle */
  variant?: 'default' | 'dark';
  /** Padding interne */
  padding?: 'sm' | 'md' | 'lg';
  /** Active l'effet hover (translateY + shadow) */
  hover?: boolean;
  style?: React.CSSProperties;
}
