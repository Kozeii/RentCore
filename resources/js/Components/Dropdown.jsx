import { useState } from 'react';

export default function Dropdown({ trigger, children, align = 'right' }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative">
            <div onClick={() => setOpen(!open)}>{trigger}</div>
            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className={'absolute z-50 mt-2 bg-white rounded-xl shadow-lg min-w-[200px] ' + (align === 'right' ? 'right-0' : 'left-0')}>
                        {children}
                    </div>
                </>
            )}
        </div>
    );
}
