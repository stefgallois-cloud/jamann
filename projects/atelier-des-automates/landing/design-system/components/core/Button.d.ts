/**
 * @startingPoint section="Components" subtitle="CTA button — primary, secondary, ghost, gradient" viewport="700x200"
 */
export interface ButtonProps {
  /** Contenu du bouton */
  children: React.ReactNode;
  /** Style visuel */
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient';
  /** Taille */
  size?: 'sm' | 'md' | 'lg';
  /** Désactivé */
  disabled?: boolean;
  /** Clic handler */
  onClick?: () => void;
  /** Rend le bouton comme un lien <a> */
  href?: string;
  /** Icône (string ou ReactNode) avant le texte */
  icon?: React.ReactNode;
}
