import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign In',
    description: 'Log in to your SecretSender account to check your anonymous messages.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
