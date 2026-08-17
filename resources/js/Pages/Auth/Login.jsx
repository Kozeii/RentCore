import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <GuestLayout>
            <Head title="Login" />
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-rc-orange">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-rc-dark">Welcome Back!</h2>
                    <p className="text-gray-500 mt-2">Login to your RentCore account</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-rc-dark">Email</label>
                        <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rc-orange" placeholder="your@email.com" required />
                        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-rc-dark">Password</label>
                        <input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rc-orange" placeholder="********" required />
                        {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input type="checkbox" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} className="rounded border-gray-300 text-rc-orange focus:ring-rc-orange" />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        <Link href="/forgot-password" className="text-sm text-rc-teal hover:text-rc-orange">Forgot password?</Link>
                    </div>
                    <button type="submit" disabled={processing} className="w-full px-4 py-3 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark disabled:opacity-50 font-medium">
                        {processing ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account? <Link href="/register" className="text-rc-orange hover:text-rc-orangeDark font-medium">Register here</Link>
                    </p>
                </div>
            </div>
        </GuestLayout>
    );
}
