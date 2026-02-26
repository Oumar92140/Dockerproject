export const metadata = {
  title: "DOCKER_FEED",
  description: "Projet Docker full stack"
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
