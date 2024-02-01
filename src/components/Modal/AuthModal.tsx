import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import useAuthModal from '@/hooks/useAuthModal';
import { useEffect } from 'react';
import { BounceLoader } from 'react-spinners';

import Modal from '.';

const AuthModal = () => {
    const { session, supabaseClient, isLoading } = useSessionContext();
    const router = useRouter();
    const { isOpen, handleClose } = useAuthModal();

    const handleChange = (open: boolean) => {
        if (!open) handleClose();
    };

    useEffect(() => {
        if (session) {
            handleClose();
            router.refresh();
        }
    }, [session]);

    if (isLoading)
        return (
            <div className="grid place-items-center z-50 fixed inset-0 bg-neutral-900">
                <BounceLoader color="#22c55e" size={40} />
            </div>
        );

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
