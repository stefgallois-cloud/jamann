export interface TagProps {
  children: React.ReactNode;
  /** Callback pour supprimer le tag (affiche un ×) */
  onRemove?: () => void;
  /** Couleur du tag */
  color?: 'default' | 'indigo' | 'violet' | 'cyan';
}
