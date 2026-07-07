export interface BadgeProps {
  children: React.ReactNode;
  /** Style de couleur */
  variant?: 'default' | 'violet' | 'cyan' | 'dark' | 'outline' | 'success';
  /** Taille */
  size?: 'sm' | 'md';
}
