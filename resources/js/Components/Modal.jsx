export default function Modal({ show, onClose, children, maxWidth = 'max-w-lg' }) {
    if (!show) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
            <div className={'bg-white rounded-xl w-full mx-4 z-10 ' + maxWidth}>
                {children}
            </div>
        </div>
    );
}
