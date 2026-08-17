import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    ChatBubbleLeftIcon,
    PaperAirplaneIcon,
    UserGroupIcon,
    BuildingOfficeIcon,
    ClockIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    CalendarIcon,
    BoltIcon,
    DocumentTextIcon,
    CurrencyDollarIcon,
    WrenchScrewdriverIcon,
    KeyIcon,
    SparklesIcon,
    MagnifyingGlassIcon,
    ChevronDownIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    BellIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';

export default function Index({ messages = [] }) {
    const [activeTab, setActiveTab] = useState('compose');
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAutomation, setSelectedAutomation] = useState(null);
    
    const { data, setData, post, processing } = useForm({
        recipients: 'all',
        message: '',
        schedule: 'now',
        template: '',
    });

    const templates = [
        { id: 1, category: 'Payment', icon: CurrencyDollarIcon, color: 'bg-rc-teal/10 text-rc-teal', name: 'Rent Reminder', description: 'Remind tenants about upcoming rent', variables: ['{tenant_name}', '{amount}', '{due_date}'], content: 'Dear {tenant_name},\n\nThis is a friendly reminder that your rent of {amount} is due on {due_date}.\n\nPlease ensure payment is made by the due date to avoid late fees.\n\nThank you,\nRentCore Management' },
        { id: 2, category: 'Payment', icon: CheckCircleIcon, color: 'bg-rc-teal/10 text-rc-teal', name: 'Payment Confirmation', description: 'Confirm payment received', variables: ['{tenant_name}', '{amount}', '{date}'], content: 'Hello {tenant_name},\n\nWe have received your payment of {amount} on {date}.\n\nThank you for your prompt payment!\n\nRentCore Management' },
        { id: 3, category: 'Payment', icon: ExclamationCircleIcon, color: 'bg-red-100 text-red-600', name: 'Late Payment Notice', description: 'Notify about overdue rent', variables: ['{tenant_name}', '{amount}', '{days_overdue}'], content: 'Dear {tenant_name},\n\nYour rent of {amount} is {days_overdue} days overdue.\n\nPlease make payment immediately to avoid additional late fees.\n\nRentCore Management' },
        { id: 4, category: 'Maintenance', icon: WrenchScrewdriverIcon, color: 'bg-rc-orange/10 text-rc-orange', name: 'Maintenance Notice', description: 'Inform about scheduled maintenance', variables: ['{tenant_name}', '{date}', '{time}', '{description}'], content: 'Dear {tenant_name},\n\nMaintenance will be performed on {date} at {time}.\n\nDetails: {description}\n\nWe apologize for any inconvenience.\n\nRentCore Management' },
        { id: 5, category: 'Lease', icon: DocumentTextIcon, color: 'bg-rc-dark/10 text-rc-dark', name: 'Lease Expiry Reminder', description: 'Alert about lease expiration', variables: ['{tenant_name}', '{expiry_date}'], content: 'Dear {tenant_name},\n\nYour lease is set to expire on {expiry_date}.\n\nPlease contact us to discuss renewal options.\n\nRentCore Management' },
        { id: 6, category: 'Lease', icon: KeyIcon, color: 'bg-rc-dark/10 text-rc-dark', name: 'Move-in Instructions', description: 'Welcome new tenants', variables: ['{tenant_name}', '{unit_number}', '{building_name}', '{move_in_date}'], content: 'Welcome {tenant_name}!\n\nYour move-in date is {move_in_date}.\n\nUnit: {unit_number} at {building_name}\n\nPlease pick up your keys at the management office.\n\nRentCore Management' },
        { id: 7, category: 'Announcement', icon: SparklesIcon, color: 'bg-yellow-100 text-yellow-600', name: 'Building Announcement', description: 'General announcement', variables: ['{announcement}'], content: 'Dear Residents,\n\n{announcement}\n\nThank you.\n\nRentCore Management' },
        { id: 8, category: 'Announcement', icon: BoltIcon, color: 'bg-red-100 text-red-600', name: 'Emergency Alert', description: 'Urgent notification', variables: ['{emergency_details}', '{action_required}'], content: 'URGENT:\n\n{emergency_details}\n\nAction Required: {action_required}\n\nRentCore Management' },
    ];

    const automationRules = [
        { id: 1, name: 'Rent Due Reminder', trigger: '3 days before due date', template: 'Rent Reminder', recipients: 'All Tenants', status: 'active', sent_count: 45, last_run: 'Jun 15, 2026', icon: CalendarIcon },
        { id: 2, name: 'Late Payment Notice', trigger: '1 day after due date', template: 'Late Payment Notice', recipients: 'Overdue Tenants', status: 'active', sent_count: 12, last_run: 'Jun 14, 2026', icon: ExclamationCircleIcon },
        { id: 3, name: 'Payment Confirmation', trigger: 'When payment received', template: 'Payment Confirmation', recipients: 'Paying Tenants', status: 'active', sent_count: 58, last_run: 'Jun 15, 2026', icon: CheckCircleIcon },
        { id: 4, name: 'Lease Expiry Alert', trigger: '30 days before lease ends', template: 'Lease Expiry Reminder', recipients: 'Expiring Tenants', status: 'inactive', sent_count: 0, last_run: '-', icon: ClockIcon },
        { id: 5, name: 'Maintenance Reminder', trigger: 'Day before scheduled maintenance', template: 'Maintenance Notice', recipients: 'Affected Units', status: 'active', sent_count: 8, last_run: 'Jun 10, 2026', icon: WrenchScrewdriverIcon },
    ];

    const recentMessages = [
        { id: 1, recipient: 'John Doe', message: 'Rent reminder sent', status: 'delivered', time: '2 min ago' },
        { id: 2, recipient: 'Jane Smith', message: 'Payment confirmation', status: 'delivered', time: '1 hour ago' },
        { id: 3, recipient: 'Mike Johnson', message: 'Maintenance notice', status: 'failed', time: '3 hours ago' },
        { id: 4, recipient: 'Sarah Williams', message: 'Lease renewal reminder', status: 'delivered', time: '5 hours ago' },
        { id: 5, recipient: 'All Tenants', message: 'Building announcement', status: 'delivered', time: 'Yesterday' },
    ];

    const filteredTemplates = selectedCategory === 'All' 
        ? templates.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : templates.filter(t => t.category === selectedCategory && t.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const categories = ['All', 'Payment', 'Maintenance', 'Lease', 'Announcement'];

    const activeAutomations = automationRules.filter(r => r.status === 'active').length;
    const totalSent = automationRules.reduce((sum, r) => sum + r.sent_count, 0);

    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template);
        setData('message', template.content);
    };

    const handleSend = (e) => {
        e.preventDefault();
        post('/messages/send');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Messages" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-rc-dark">SMS Messages</h1>
                        <p className="mt-1 text-gray-500">Send reminders and automate notifications</p>
                    </div>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-rc-teal/10 text-rc-teal rounded-full text-sm font-medium">
                            {activeAutomations} Active Automations
                        </span>
                        <span className="px-3 py-1 bg-rc-orange/10 text-rc-orange rounded-full text-sm font-medium">
                            {totalSent} Total Sent
                        </span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('compose')}
                        className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === 'compose' ? 'border-rc-orange text-rc-orange' : 'border-transparent text-gray-500 hover:text-rc-dark'}`}
                    >
                        ✏️ Compose
                    </button>
                    <button
                        onClick={() => setActiveTab('templates')}
                        className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === 'templates' ? 'border-rc-orange text-rc-orange' : 'border-transparent text-gray-500 hover:text-rc-dark'}`}
                    >
                        📋 Templates
                    </button>
                    <button
                        onClick={() => setActiveTab('automation')}
                        className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === 'automation' ? 'border-rc-orange text-rc-orange' : 'border-transparent text-gray-500 hover:text-rc-dark'}`}
                    >
                        ⚡ Automations
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === 'history' ? 'border-rc-orange text-rc-orange' : 'border-transparent text-gray-500 hover:text-rc-dark'}`}
                    >
                        📜 History
                    </button>
                </div>

                {/* Compose Tab */}
                {activeTab === 'compose' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border-t-4 border-rc-orange">
                            <form onSubmit={handleSend} className="space-y-6">
                                {/* Recipients */}
                                <div>
                                    <label className="block text-sm font-medium text-rc-dark mb-2">Recipients</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        <button type="button" onClick={() => setData('recipients', 'all')} className={`p-4 rounded-lg border-2 text-center ${data.recipients === 'all' ? 'border-rc-orange bg-rc-orange/5' : 'border-gray-200 hover:border-rc-teal'}`}>
                                            <UserGroupIcon className="h-6 w-6 mx-auto text-rc-teal" />
                                            <span className="block mt-2 text-sm font-medium text-rc-dark">All Tenants</span>
                                            <span className="text-xs text-gray-500">58 recipients</span>
                                        </button>
                                        <button type="button" onClick={() => setData('recipients', 'building')} className={`p-4 rounded-lg border-2 text-center ${data.recipients === 'building' ? 'border-rc-orange bg-rc-orange/5' : 'border-gray-200 hover:border-rc-teal'}`}>
                                            <BuildingOfficeIcon className="h-6 w-6 mx-auto text-rc-orange" />
                                            <span className="block mt-2 text-sm font-medium text-rc-dark">By Building</span>
                                            <span className="text-xs text-gray-500">Select building</span>
                                        </button>
                                        <button type="button" onClick={() => setData('recipients', 'individual')} className={`p-4 rounded-lg border-2 text-center ${data.recipients === 'individual' ? 'border-rc-orange bg-rc-orange/5' : 'border-gray-200 hover:border-rc-teal'}`}>
                                            <ChatBubbleLeftIcon className="h-6 w-6 mx-auto text-rc-dark" />
                                            <span className="block mt-2 text-sm font-medium text-rc-dark">Individual</span>
                                            <span className="text-xs text-gray-500">Select tenant</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-sm font-medium text-rc-dark mb-2">Message</label>
                                    <textarea
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        rows={6}
                                        placeholder="Type your message here or select a template..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-rc-orange"
                                    />
                                    <div className="mt-2 flex justify-between">
                                        <span className="text-xs text-gray-500">{data.message.length} characters</span>
                                        {selectedTemplate && (
                                            <span className="text-xs text-rc-orange">Template: {selectedTemplate.name}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Schedule */}
                                <div className="flex gap-3">
                                    <button type="button" onClick={() => setData('schedule', 'now')} className={`px-4 py-2 rounded-lg text-sm font-medium ${data.schedule === 'now' ? 'bg-rc-orange text-white' : 'bg-rc-light text-rc-dark'}`}>
                                        Send Now
                                    </button>
                                    <button type="button" onClick={() => setData('schedule', 'later')} className={`px-4 py-2 rounded-lg text-sm font-medium ${data.schedule === 'later' ? 'bg-rc-orange text-white' : 'bg-rc-light text-rc-dark'}`}>
                                        Schedule
                                    </button>
                                </div>

                                {/* Send */}
                                <div className="flex justify-end">
                                    <button type="submit" disabled={processing} className="inline-flex items-center px-6 py-3 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark disabled:opacity-50">
                                        <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                                        {processing ? 'Sending...' : 'Send Message'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Template Preview */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rc-teal">
                            <h3 className="text-lg font-semibold text-rc-dark mb-4">Template Preview</h3>
                            {selectedTemplate ? (
                                <div>
                                    <div className="flex items-center mb-3">
                                        <div className={`p-3 rounded-full ${selectedTemplate.color}`}>
                                            <selectedTemplate.icon className="h-6 w-6" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="font-medium text-rc-dark">{selectedTemplate.name}</p>
                                            <p className="text-xs text-gray-500">{selectedTemplate.category}</p>
                                        </div>
                                    </div>
                                    <div className="bg-rc-light rounded-lg p-4 mb-4">
                                        <p className="text-xs font-medium text-rc-dark mb-2">Variables:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedTemplate.variables.map((variable) => (
                                                <span key={variable} className="px-2 py-1 bg-rc-orange/10 text-rc-orange rounded text-xs font-mono">
                                                    {variable}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <button onClick={() => setData('message', selectedTemplate.content)} className="w-full px-4 py-2 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark text-sm">
                                        Use This Template
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <DocumentTextIcon className="h-12 w-12 text-gray-300 mx-auto" />
                                    <p className="mt-2 text-gray-500 text-sm">Select a template</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Templates Tab */}
                {activeTab === 'templates' && (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 relative">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input type="text" placeholder="Search templates..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg" />
                            </div>
                            <div className="flex gap-2">
                                {categories.map((cat) => (
                                    <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedCategory === cat ? 'bg-rc-orange text-white' : 'bg-white text-rc-dark border border-gray-200'}`}>
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTemplates.map((template) => (
                                <button key={template.id} onClick={() => handleTemplateSelect(template)} className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-xl transition-all border-t-4 border-rc-orange hover:border-rc-teal">
                                    <div className="flex items-center mb-3">
                                        <div className={`p-3 rounded-full ${template.color}`}>
                                            <template.icon className="h-6 w-6" />
                                        </div>
                                        <span className="ml-2 px-2 py-1 bg-rc-light text-rc-dark rounded-full text-xs">{template.category}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-rc-dark">{template.name}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                                    <div className="mt-3 flex flex-wrap gap-1">
                                        {template.variables.map((variable) => (
                                            <span key={variable} className="px-2 py-1 bg-rc-light text-rc-dark rounded text-xs font-mono">{variable}</span>
                                        ))}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Automation Tab */}
                {activeTab === 'automation' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <p className="text-gray-600">Configure automated SMS rules</p>
                            <button className="px-4 py-2 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark">
                                <PlusIcon className="h-5 w-5 inline mr-1" /> New Automation
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {automationRules.map((rule) => (
                                <div key={rule.id} className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-rc-teal hover:shadow-lg transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center">
                                            <div className={`p-3 rounded-full ${rule.status === 'active' ? 'bg-rc-teal/10' : 'bg-gray-100'}`}>
                                                <rule.icon className={`h-6 w-6 ${rule.status === 'active' ? 'text-rc-teal' : 'text-gray-400'}`} />
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-sm font-semibold text-rc-dark">{rule.name}</h3>
                                                <p className="text-xs text-gray-500 mt-1">{rule.trigger}</p>
                                            </div>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${rule.status === 'active' ? 'bg-rc-teal/10 text-rc-teal' : 'bg-gray-100 text-gray-500'}`}>
                                            {rule.status}
                                        </span>
                                    </div>
                                    <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                                        <div className="bg-rc-light rounded-lg p-2">
                                            <p className="text-xs text-gray-500">Template</p>
                                            <p className="text-sm font-medium text-rc-dark">{rule.template}</p>
                                        </div>
                                        <div className="bg-rc-light rounded-lg p-2">
                                            <p className="text-xs text-gray-500">Sent</p>
                                            <p className="text-sm font-medium text-rc-dark">{rule.sent_count}</p>
                                        </div>
                                        <div className="bg-rc-light rounded-lg p-2">
                                            <p className="text-xs text-gray-500">Last Run</p>
                                            <p className="text-sm font-medium text-rc-dark">{rule.last_run}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <button className="px-3 py-1 text-xs bg-rc-teal/10 text-rc-teal rounded-lg">Edit</button>
                                        <button className="px-3 py-1 text-xs bg-rc-orange/10 text-rc-orange rounded-lg">Toggle</button>
                                        <button className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded-lg">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border-t-4 border-rc-orange">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-rc-dark">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Recipient</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Message</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {recentMessages.map((msg) => (
                                    <tr key={msg.id} className="hover:bg-rc-light">
                                        <td className="px-6 py-4 text-sm font-medium text-rc-dark">{msg.recipient}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{msg.message}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${msg.status === 'delivered' ? 'bg-rc-teal/10 text-rc-teal' : 'bg-red-100 text-red-600'}`}>
                                                {msg.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{msg.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}