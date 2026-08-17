export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={'px-4 py-2 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark disabled:opacity-50 transition-colors ' + className}
        >
            {children}
        </button>
    );
}
