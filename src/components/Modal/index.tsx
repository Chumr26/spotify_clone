import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
    isOpen: boolean;
    handleChange: (open: boolean) => void;
    title: string;
    description?: string;
    children: React.ReactNode;
}

const Modal = ({
    isOpen,
    handleChange,
    title,
    description,
    children,
}: ModalProps) => {
    return (
        <Dialog.Root open={isOpen} onOpenChange={handleChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-neutral-900/90 backdrop-blur-sm fixed inset-0 z-30" />
                <Dialog.Content className="fixed p-[25px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-full md:h-auto md:max-h-[90vh] w-full md:w-[90vw] md:max-w-[450px] bg-neutral-800 border border-neutral-700 md:rounded-md focus:outline-none z-30 overflow-y-auto no-scrollbar">
                    <Dialog.Title className="text-xl text-center font-bold mb-4">
                        {title}
                    </Dialog.Title>
                    <Dialog.Description className="text-center mb-5">
                        {description}
                    </Dialog.Description>
                    <div>{children}</div>
                    <Dialog.Close className="absolute top-[10px] right-[10px] text-neutral-400 transition hover:text-white focus:outline-none">
                        <IoMdClose size={25} />
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default Modal;
