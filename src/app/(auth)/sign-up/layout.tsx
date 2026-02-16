import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign Up',
    description: 'Join SecretSender today and start receiving anonymous feedback and messages.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
