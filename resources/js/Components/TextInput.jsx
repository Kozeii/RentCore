import { forwardRef } from 'react';

const TextInput = forwardRef(function TextInput({ className = '', ...props }, ref) {
    return (
        <input
            {...props}
            ref={ref}
            className={'mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rc-orange focus:border-rc-orange ' + className}
        />
    );
});

export default TextInput;
