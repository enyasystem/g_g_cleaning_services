export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  // Middleware handles authentication and redirects unauthenticated users.
  // If user reaches here, they are authenticated.
  return <>{children}</>;
}
