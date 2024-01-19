import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';

import Modal from './Modal';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import useAuthModal from '@/hooks/useAuthModal';
import { useEffect } from 'react';

const AuthModal = () => {
    const { session, supabaseClient } = useSessionContext();
    const router = useRouter();
    const { isOpen, handleClose } = useAuthModal();

    const handleChange = (open: boolean) => {
        if (!open) handleClose();
    };

    useEffect(() => {
        if (session) {
            handleClose();
            router.refresh()
        }
    }, [session]);

    return (
        <Modal
            isOpen={isOpen}
            title="Welcome back"
            description="Login to your account"
            handleChange={handleChange}
        >
            <Auth
                supabaseClient={supabaseClient}
                providers={['google', 'facebook', 'github']}
                magicLink
                theme="dark"
                appearance={{
                    theme: ThemeSupa,
                    variables: { default: { colors: { brand: '#404040' } } },
                }}
            />
        </Modal>
    );
};

export default AuthModal;
