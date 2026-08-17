export default function SecondaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={'px-4 py-2 bg-white border border-gray-300 text-rc-dark rounded-lg hover:bg-rc-light disabled:opacity-50 ' + className}
        >
            {children}
        </button>
    );
}
