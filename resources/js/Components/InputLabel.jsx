export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label className={'block text-sm font-medium text-rc-dark ' + className} {...props}>
            {value ? value : children}
        </label>
    );
}
