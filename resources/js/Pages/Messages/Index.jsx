import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Toast, ConfirmModal, EmptyState, StatusBadge, FilterChips } from '@/Components/UI';
import {
    ChatBubbleLeftIcon, PaperAirplaneIcon, UserGroupIcon, BuildingOfficeIcon,
    ClockIcon, CheckCircleIcon, ExclamationCircleIcon, CalendarIcon, BoltIcon,
    DocumentTextIcon, CurrencyDollarIcon, WrenchScrewdriverIcon, KeyIcon,
    SparklesIcon, MagnifyingGlassIcon, ChevronDownIcon, PlusIcon, PencilIcon,
    TrashIcon, BellIcon, XCircleIcon, ChartBarIcon, BanknotesIcon,
} from '@heroicons/react/24/outline';

export default function Index({ messages = [] }) {
    const [activeTab, setActiveTab] = useState('compose');
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [toast, setToast] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const [drafts, setDrafts] = useState([]);
    const [conversation, setConversation] = useState([
        { from: 'tenant', text: 'Okay, I\'ll pay by then. Thank you!' },
    ]);
    const [replyText, setReplyText] = useState('');
    
    const { data, setData, post, processing } = useForm({
        recipients: 'all',
        message: '',
        schedule: 'now',
        template: '',
    });

    // SMS Analytics
    const smsStats = [
        { name: 'Total Sent', value: '245', icon: '📤', color: 'border-rc-teal', bg: 'bg-rc-teal/10' },
        { name: 'Delivered', value: '238', icon: '✅', color: 'border-rc-orange', bg: 'bg-rc-orange/10' },
        { name: 'Failed', value: '7', icon: '❌', color: 'border-red-500', bg: 'bg-red-50' },
        { name: 'Pending', value: '0', icon: '⏳', color: 'border-yellow-500', bg: 'bg-yellow-50' },
    ];

    // Delivery Report
    const deliveryRate = 97;
    const failedRate = 3;

    // Contact Groups
    const contactGroups = [
        { name: 'All Tenants', count: 58, icon: '👥', color: 'text-rc-teal' },
        { name: 'Sunset Apartments', count: 20, icon: '🏢', color: 'text-rc-orange' },
        { name: 'Overdue Tenants', count: 5, icon: '⚠️', color: 'text-red-600' },
        { name: 'Green Valley Condos', count: 15, icon: '🏢', color: 'text-rc-dark' },
    ];

    // Quick Replies
    const quickReplies = [
        { text: 'Yes', color: 'bg-rc-teal' },
        { text: 'No', color: 'bg-red-500' },
        { text: 'Thank you', color: 'bg-rc-orange' },
        { text: 'Please call us', color: 'bg-rc-dark' },
        { text: 'Payment received', color: 'bg-rc-teal' },
    ];

    // Scheduled Messages
    const scheduledMessages = [
        { id: 1, message: 'Rent Reminder - All Tenants', date: 'Jun 20, 2026', time: '9:00 AM', status: 'scheduled' },
        { id: 2, message: 'Maintenance Notice - Sunset Apartments', date: 'Jun 22, 2026', time: '2:00 PM', status: 'scheduled' },
    ];

    // Opted Out
    const optedOut = ['John Doe', 'Jane Smith', 'Mike Johnson'];

    // SMS Cost
    const smsCost = { total: 450, messages: 245, avg: 1.84 };

    const templates = [
        { id: 1, category: 'Payment', icon: CurrencyDollarIcon, color: 'bg-rc-teal/10 text-rc-teal', name: 'Rent Reminder', description: 'Remind tenants about upcoming rent', variables: ['{tenant_name}', '{amount}', '{due_date}'], content: 'Dear {tenant_name},\n\nThis is a friendly reminder that your rent of {amount} is due on {due_date}.\n\nRentCore Management' },
        { id: 2, category: 'Payment', icon: CheckCircleIcon, color: 'bg-rc-teal/10 text-rc-teal', name: 'Payment Confirmation', description: 'Confirm payment received', variables: ['{tenant_name}', '{amount}'], content: 'Hello {tenant_name},\n\nWe have received your payment of {amount}.\n\nThank you!\n\nRentCore Management' },
        { id: 3, category: 'Payment', icon: ExclamationCircleIcon, color: 'bg-red-100 text-red-600', name: 'Late Payment Notice', description: 'Notify about overdue rent', variables: ['{tenant_name}', '{amount}', '{days_overdue}'], content: 'Dear {tenant_name},\n\nYour rent of {amount} is {days_overdue} days overdue.\n\nRentCore Management' },
        { id: 4, category: 'Maintenance', icon: WrenchScrewdriverIcon, color: 'bg-rc-orange/10 text-rc-orange', name: 'Maintenance Notice', description: 'Inform about scheduled maintenance', variables: ['{tenant_name}', '{date}', '{description}'], content: 'Dear {tenant_name},\n\nMaintenance will be performed on {date}.\n\nDetails: {description}\n\nRentCore Management' },
        { id: 5, category: 'Lease', icon: DocumentTextIcon, color: 'bg-rc-dark/10 text-rc-dark', name: 'Lease Expiry', description: 'Alert about lease expiration', variables: ['{tenant_name}', '{expiry_date}'], content: 'Dear {tenant_name},\n\nYour lease expires on {expiry_date}.\n\nRentCore Management' },
        { id: 6, category: 'Announcement', icon: SparklesIcon, color: 'bg-yellow-100 text-yellow-600', name: 'Building Announcement', description: 'General announcement', variables: ['{announcement}'], content: 'Dear Residents,\n\n{announcement}\n\nRentCore Management' },
    ];

    const automationRules = [
        { id: 1, name: 'Rent Due Reminder', trigger: '3 days before due', sent: 45, status: 'active', icon: CalendarIcon },
        { id: 2, name: 'Late Payment Notice', trigger: '1 day after due', sent: 12, status: 'active', icon: ExclamationCircleIcon },
        { id: 3, name: 'Payment Confirmation', trigger: 'On payment', sent: 58, status: 'active', icon: CheckCircleIcon },
        { id: 4, name: 'Lease Expiry Alert', trigger: '30 days before', sent: 0, status: 'inactive', icon: ClockIcon },
    ];

    const filteredTemplates = selectedCategory === 'All' 
        ? templates.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : templates.filter(t => t.category === selectedCategory && t.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const categories = ['All', 'Payment', 'Maintenance', 'Lease', 'Announcement'];

    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template);
        setData('message', template.content);
        setToast({ message: `Template "${template.name}" applied!`, type: 'success' });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSend = (e) => {
        e.preventDefault();
        setToast({ message: 'Message sent successfully!', type: 'success' });
        setTimeout(() => setToast(null), 3000);
    };

    const saveDraft = () => {
        if (data.message.trim()) {
            setDrafts([...drafts, { id: Date.now(), content: data.message, savedAt: new Date().toLocaleString() }]);
            setToast({ message: 'Draft saved!', type: 'success' });
            setTimeout(() => setToast(null), 3000);
        }
    };

    const sendReply = () => {
        if (replyText.trim()) {
            setConversation([...conversation, { from: 'landlord', text: replyText }]);
            setReplyText('');
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Messages" />

            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-rc-dark">SMS Messages</h1>
                        <p className="text-gray-500 mt-1">Send reminders and automate notifications</p>
                    </div>
                </div>

                {/* SMS Analytics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {smsStats.map((stat) => (
                        <div key={stat.name} className={`bg-white rounded-xl shadow-sm p-4 border-t-4 ${stat.color}`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">{stat.name}</p>
                                    <p className="text-2xl font-bold text-rc-dark">{stat.value}</p>
                                </div>
                                <span className={`text-3xl ${stat.bg} p-2 rounded-lg`}>{stat.icon}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 overflow-x-auto">
                    {['compose', 'templates', 'automation', 'scheduled', 'history', 'analytics', 'conversation'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 ${activeTab === tab ? 'border-rc-orange text-rc-orange' : 'border-transparent text-gray-500'}`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Compose Tab */}
                {activeTab === 'compose' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            {/* Recipients */}
                            <div className="bg-white rounded-xl shadow-sm p-4 border-t-4 border-rc-orange">
                                <label className="block text-sm font-medium text-rc-dark mb-3">Recipients</label>
                                <div className="grid grid-cols-3 gap-3">
                                    <button onClick={() => setData('recipients', 'all')} className={`p-3 rounded-lg border-2 ${data.recipients === 'all' ? 'border-rc-orange bg-rc-orange/5' : 'border-gray-200'}`}>
                                        <UserGroupIcon className="h-6 w-6 mx-auto text-rc-teal" />
                                        <span className="block text-sm mt-1">All (58)</span>
                                    </button>
                                    <button onClick={() => setData('recipients', 'building')} className={`p-3 rounded-lg border-2 ${data.recipients === 'building' ? 'border-rc-orange bg-rc-orange/5' : 'border-gray-200'}`}>
                                        <BuildingOfficeIcon className="h-6 w-6 mx-auto text-rc-orange" />
                                        <span className="block text-sm mt-1">Building</span>
                                    </button>
                                    <button onClick={() => setData('recipients', 'individual')} className={`p-3 rounded-lg border-2 ${data.recipients === 'individual' ? 'border-rc-orange bg-rc-orange/5' : 'border-gray-200'}`}>
                                        <ChatBubbleLeftIcon className="h-6 w-6 mx-auto text-rc-dark" />
                                        <span className="block text-sm mt-1">Individual</span>
                                    </button>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="bg-white rounded-xl shadow-sm p-4 border-t-4 border-rc-teal">
                                <label className="block text-sm font-medium text-rc-dark mb-3">Message</label>
                                <textarea
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    rows={5}
                                    placeholder="Type your message..."
                                    className="w-full px-4 py-2 border rounded-lg font-mono text-sm focus:ring-rc-orange"
                                />
                                <div className="flex justify-between mt-2">
                                    <span className="text-xs text-gray-500">{data.message.length} characters</span>
                                    <button onClick={saveDraft} className="text-xs text-rc-teal hover:text-rc-orange">💾 Save Draft</button>
                                </div>
                            </div>

                            {/* Quick Replies */}
                            <div className="bg-white rounded-xl shadow-sm p-4">
                                <label className="block text-sm font-medium text-rc-dark mb-2">Quick Replies</label>
                                <div className="flex gap-2 flex-wrap">
                                    {quickReplies.map(qr => (
                                        <button key={qr.text} onClick={() => setData('message', data.message + ' ' + qr.text)} className={`px-3 py-1 ${qr.color} text-white rounded-full text-xs`}>
                                            {qr.text}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Send */}
                            <div className="flex gap-3">
                                <button onClick={handleSend} disabled={processing} className="flex-1 px-6 py-3 bg-rc-orange text-white rounded-lg hover:bg-rc-orangeDark">
                                    <PaperAirplaneIcon className="h-5 w-5 inline mr-2" /> Send Message
                                </button>
                                <button onClick={() => setData('schedule', 'later')} className={`px-6 py-3 rounded-lg ${data.schedule === 'later' ? 'bg-rc-teal text-white' : 'bg-white border'}`}>
                                    📅 Schedule
                                </button>
                            </div>
                        </div>

                        {/* Right Panel */}
                        <div className="space-y-4">
                            {/* Template Preview */}
                            <div className="bg-white rounded-xl shadow-sm p-4 border-t-4 border-rc-orange">
                                <h3 className="font-semibold mb-3">Template Preview</h3>
                                {selectedTemplate ? (
                                    <div>
                                        <p className="text-sm text-rc-orange">{selectedTemplate.name}</p>
                                        <div className="bg-rc-light rounded-lg p-3 mt-2">
                                            {selectedTemplate.variables.map(v => (
                                                <span key={v} className="px-2 py-1 bg-rc-orange/10 text-rc-orange rounded text-xs font-mono mr-1">{v}</span>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">Select a template to preview</p>
                                )}
                            </div>

                            {/* Contact Groups */}
                            <div className="bg-white rounded-xl shadow-sm p-4">
                                <h3 className="font-semibold mb-3">Contact Groups</h3>
                                <div className="space-y-2">
                                    {contactGroups.map(group => (
                                        <div key={group.name} className="flex justify-between items-center p-2 bg-rc-light rounded-lg">
                                            <span className="text-sm">{group.icon} {group.name}</span>
                                            <span className={`text-sm font-medium ${group.color}`}>{group.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Drafts */}
                            {drafts.length > 0 && (
                                <div className="bg-white rounded-xl shadow-sm p-4">
                                    <h3 className="font-semibold mb-3">Drafts ({drafts.length})</h3>
                                    <div className="space-y-2 max-h-40 overflow-y-auto">
                                        {drafts.map(draft => (
                                            <button key={draft.id} onClick={() => setData('message', draft.content)} className="block w-full text-left p-2 bg-rc-light rounded-lg text-sm">
                                                {draft.content.substring(0, 50)}...
                                                <span className="block text-xs text-gray-400">{draft.savedAt}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Templates Tab */}
                {activeTab === 'templates' && (
                    <div className="space-y-4">
                        <div className="flex gap-2 flex-wrap">
                            {categories.map(cat => (
                                <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-lg text-sm ${selectedCategory === cat ? 'bg-rc-orange text-white' : 'bg-white border'}`}>
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTemplates.map(template => (
                                <button key={template.id} onClick={() => handleTemplateSelect(template)} className="bg-white rounded-xl p-6 text-left border-t-4 border-rc-orange hover:shadow-lg">
                                    <template.icon className={`h-8 w-8 ${template.color}`} />
                                    <h3 className="font-semibold mt-3">{template.name}</h3>
                                    <p className="text-sm text-gray-500">{template.description}</p>
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {template.variables.map(v => <span key={v} className="text-xs bg-rc-light px-2 py-1 rounded">{v}</span>)}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Automation Tab */}
                {activeTab === 'automation' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {automationRules.map(rule => (
                            <div key={rule.id} className="bg-white rounded-xl p-6 border-t-4 border-rc-teal">
                                <div className="flex justify-between">
                                    <div className="flex items-center">
                                        <rule.icon className="h-6 w-6 text-rc-teal" />
                                        <h3 className="font-semibold ml-3">{rule.name}</h3>
                                    </div>
                                    <StatusBadge status={rule.status} />
                                </div>
                                <p className="text-sm text-gray-500 mt-2">{rule.trigger}</p>
                                <p className="text-xs text-rc-orange mt-2">Sent: {rule.sent} messages</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Scheduled Tab */}
                {activeTab === 'scheduled' && (
                    <div className="bg-white rounded-xl overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-rc-dark">
                                <tr>
                                    <th className="px-6 py-3 text-left text-white text-xs">Message</th>
                                    <th className="px-6 py-3 text-left text-white text-xs">Date</th>
                                    <th className="px-6 py-3 text-left text-white text-xs">Time</th>
                                    <th className="px-6 py-3 text-left text-white text-xs">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {scheduledMessages.map(msg => (
                                    <tr key={msg.id} className="hover:bg-rc-light">
                                        <td className="px-6 py-4 text-sm">{msg.message}</td>
                                        <td className="px-6 py-4 text-sm">{msg.date}</td>
                                        <td className="px-6 py-4 text-sm">{msg.time}</td>
                                        <td className="px-6 py-4"><button className="text-rc-orange text-sm">Cancel</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Analytics Tab */}
                {activeTab === 'analytics' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 border-t-4 border-rc-orange">
                            <h3 className="font-semibold mb-4">📊 Delivery Report</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Delivered</span>
                                        <span className="text-rc-teal font-medium">{deliveryRate}%</span>
                                    </div>
                                    <div className="h-3 bg-rc-light rounded-full">
                                        <div className="h-3 bg-rc-teal rounded-full" style={{ width: `${deliveryRate}%` }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Failed</span>
                                        <span className="text-red-600 font-medium">{failedRate}%</span>
                                    </div>
                                    <div className="h-3 bg-rc-light rounded-full">
                                        <div className="h-3 bg-red-500 rounded-full" style={{ width: `${failedRate}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 border-t-4 border-rc-teal">
                            <h3 className="font-semibold mb-4">💰 SMS Cost Tracker</h3>
                            <p className="text-3xl font-bold text-rc-orange">₱{smsCost.total}</p>
                            <p className="text-sm text-gray-500 mt-1">{smsCost.messages} messages this month</p>
                            <p className="text-xs text-gray-400">Average: ₱{smsCost.avg} per message</p>
                        </div>

                        <div className="bg-white rounded-xl p-6">
                            <h3 className="font-semibold mb-4">🚫 Opted Out ({optedOut.length})</h3>
                            {optedOut.map(name => (
                                <div key={name} className="flex justify-between p-2 border-b">
                                    <span>{name}</span>
                                    <button className="text-rc-teal text-sm">Re-subscribe</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Conversation Tab */}
                {activeTab === 'conversation' && (
                    <div className="bg-white rounded-xl p-6 border-t-4 border-rc-orange">
                        <h3 className="font-semibold mb-4">💬 Two-Way Conversation</h3>
                        <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
                            {conversation.map((msg, i) => (
                                <div key={i} className={`flex ${msg.from === 'landlord' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`${msg.from === 'landlord' ? 'bg-rc-orange text-white' : 'bg-rc-light text-rc-dark'} rounded-xl px-4 py-2 max-w-xs`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input type="text" value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Type reply..." className="flex-1 px-4 py-2 border rounded-lg" />
                            <button onClick={sendReply} className="px-4 py-2 bg-rc-orange text-white rounded-lg">Send</button>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}