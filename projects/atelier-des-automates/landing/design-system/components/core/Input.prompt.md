Champ de saisie — formulaire email, recherche, contact.

```jsx
<Input type="email" placeholder="ton@email.com" label="Email" />
<Input label="Ton prénom" hint="On ne spamme pas, promis." />
<Input error="Email invalide" value="pas-un-email" />
<Input icon="✉" placeholder="Entre ton email ici" />
```

Focus: ring indigo 3px. Error: bordure rouge + message rouge.
Toujours un `label` pour l'accessibilité.
