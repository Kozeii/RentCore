import { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Toast, ConfirmModal, EmptyState, StatusBadge, FilterChips, Spinner } from '@/Components/UI';
import {
    ChatBubbleLeftIcon, PaperAirplaneIcon, UserGroupIcon, BuildingOfficeIcon,
    ClockIcon, CheckCircleIcon, ExclamationCircleIcon, CalendarIcon, BoltIcon,
    DocumentTextIcon, CurrencyDollarIcon, WrenchScrewdriverIcon, KeyIcon,
    SparklesIcon, MagnifyingGlassIcon, ChevronDownIcon, PlusIcon, PencilIcon,
    TrashIcon, BellIcon, XCircleIcon, ChartBarIcon, BanknotesIcon,
    ArrowPathIcon, EyeIcon, PhotoIcon, MegaphoneIcon, CalendarDaysIcon,
} from '@heroicons/react/24/outline';

export default function Index({ messages = [] }) {
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('compose');
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [toast, setToast] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const [drafts, setDrafts] = useState([]);
    const [conversation, setConversation] = useState([
        { from: 'tenant', text: 'Okay, I\'ll pay by then. Thank you!', time: '10:30 AM' },
        { from: 'landlord', text: 'Great! Please let us know if you need anything.', time: '10:32 AM' },
    ]);
    const [replyText, setReplyText] = useState('');
    const [readReceipts, setReadReceipts] = useState({});
    const [showEmergencyBroadcast, setShowEmergencyBroadcast] = useState(false);
    const [showABTest, setShowABTest] = useState(false);
    const [showScheduleCalendar, setShowScheduleCalendar] = useState(false);
    
    const { data, setData, post, processing } = useForm({
        recipients: 'all',
        message: '',
        schedule: 'now',
        template: '',
    });

    // SMS Analytics
    const smsStats = [
        { name: 'Total Sent', value: '245', icon: '📤', color: 'border-rc-teal', trend: '+12%' },
        { name: 'Delivered', value: '238', icon: '✅', color: 'border-rc-orange', trend: '+15%' },
        { name: 'Failed', value: '7', icon: '❌', color: 'border-red-500', trend: '-3%' },
        { name: 'Read Rate', value: '92%', icon: '👁️', color: 'border-yellow-500', trend: '+5%' },
    ];

    // Templates with images
    const templates = [
        { id: 1, category: 'Payment', icon: CurrencyDollarIcon, color: 'bg-rc-teal/10 text-rc-teal', name: 'Rent Reminder', description: 'Remind tenants about rent', hasImage: false, content: 'Dear {tenant_name}, rent of {amount} due on {due_date}.' },
        { id: 2, category: 'Payment', icon: CheckCircleIcon, color: 'bg-rc-teal/10 text-rc-teal', name: 'Payment Confirmation', description: 'Confirm payment', hasImage: true, content: 'Payment of {amount} received. Thank you!' },
        { id: 3, category: 'Maintenance', icon: WrenchScrewdriverIcon, color: 'bg-rc-orange/10 text-rc-orange', name: 'Maintenance Notice', description: 'Scheduled maintenance', hasImage: true, content: 'Maintenance on {date}. Details: {description}' },
        { id: 4, category: 'Announcement', icon: MegaphoneIcon, color: 'bg-red-100 text-red-600', name: 'Emergency Alert', description: 'Urgent broadcast', hasImage: false, content: 'URGENT: {emergency_details}' },
    ];

    // Quick Replies
    const quickReplies = [
        { text: 'Yes', color: 'bg-rc-teal' },
        { text: 'No', color: 'bg-red-500' },
        { text: 'Thank you', color: 'bg-rc-orange' },
        { text: 'Please call us', color: 'bg-rc-dark' },
        { text: 'Payment received', color: 'bg-rc-teal' },
        { text: 'We will check', color: 'bg-yellow-500' },
    ];

    // Scheduled Messages
    const scheduledMessages = [
        { id: 1, message: 'Rent Reminder - All Tenants', date: 'Jun 20, 2026', time: '9:00 AM', recipients: 58, status: 'scheduled' },
        { id: 2, message: 'Maintenance Notice - Sunset Apartments', date: 'Jun 22, 2026', time: '2:00 PM', recipients: 20, status: 'scheduled' },
        { id: 3, message: 'Lease Renewal - Riverside Towers', date: 'Jun 25, 2026', time: '10:00 AM', recipients: 25, status: 'scheduled' },
    ];

    // Contact Groups
    const contactGroups = [
        { name: 'All Tenants', count: 58, icon: '👥' },
        { name: 'Sunset Apartments', count: 20, icon: '🏢' },
        { name: 'Overdue Tenants', count: 5, icon: '⚠️' },
        { name: 'Green Valley Condos', count: 15, icon: '🏢' },
        { name: 'Riverside Towers', count: 25, icon: '🏢' },
    ];

    // Opted Out
    const optedOut = ['John Doe', 'Jane Smith', 'Mike Johnson'];

    // AB Test Variants
    const abTestVariants = [
        { variant: 'A', message: 'Dear {tenant}, rent is due on {date}.', expected: '55% open rate' },
        { variant: 'B', message: 'Hi {tenant}! Friendly reminder about rent due {date}.', expected: '68% open rate' },
    ];

    // Automation Rules
    const automationRules = [
        { id: 1, name: 'Rent Due Reminder', trigger: '3 days before', sent: 45, status: 'active' },
        { id: 2, name: 'Late Payment', trigger: '1 day after', sent: 12, status: 'active' },
        { id: 3, name: 'Payment Confirmation', trigger: 'On payment', sent: 58, status: 'active' },
        { id: 4, name: 'Lease Expiry', trigger: '30 days before', sent: 0, status: 'inactive' },
    ];

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    const handleSend = (e) => {
        e.preventDefault();
        setToast({ message: 'Message sent successfully!', type: 'success' });
        setTimeout(() => setToast(null), 3000);
        setData('message', '');
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
            setConversation([...conversation, { from: 'landlord', text: replyText, time: new Date().toLocaleTimeString() }]);
            setReplyText('');
        }
    };

    const markAsRead = (msgId) => {
        setReadReceipts({ ...readReceipts, [msgId]: true });
    };

    const handleEmergencyBroadcast = () => {
        setToast({ message: '🚨 Emergency broadcast sent to ALL tenants!', type: 'error' });
        setTimeout(() => setToast(null), 5000);
        setShowEmergencyBroadcast(false);
    };

    const runABTest = () => {
        setToast({ message: 'A/B Test launched! Variant B expected to perform better.', type: 'success' });
        setTimeout(() => setToast(null), 3000);
        setShowABTest(false);
    };

    if (loading) {
        return (
            <AuthenticatedLayout>
                <Head title="Messages" />
                <Spinner />
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <Head title="Messages" />
            
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-rc-dark">SMS Messages</h1>
                        <p className="text-gray-500 mt-1">Send, schedule, and automate messages</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setShowEmergencyBroadcast(true)} className="px-4 py-2 bg-red-600 text-white rounded-lg">
                            🚨 Emergency
                        </button>
                        <button onClick={() => setShowABTest(true)} className="px-4 py-2 bg-rc-teal text-white rounded-lg">
                            🧪 A/B Test
                        </button>
                    </div>
                </div>

                {/* SMS Analytics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {smsStats.map(stat => (
                        <div key={stat.name} className={`bg-white rounded-xl p-4 border-t-4 ${stat.color}`}>
                            <div className="flex justify-between">
                                <p className="text-sm text-gray-500">{stat.name}</p>
                                <span className="text-2xl">{stat.icon}</span>
                            </div>
                            <p className="text-2xl font-bold text-rc-dark mt-1">{stat.value}</p>
                            <p className="text-xs text-rc-teal mt-1">{stat.trend} this month</p>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 overflow-x-auto">
                    {['compose', 'templates', 'automation', 'scheduled', 'conversation', 'analytics', 'groups'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 ${activeTab === tab ? 'border-rc-orange text-rc-orange' : 'border-transparent text-gray-500'}`}>
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Compose Tab */}
                {activeTab === 'compose' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            {/* Recipients */}
                            <div className="bg-white rounded-xl p-4 border-t-4 border-rc-orange">
                                <label className="block text-sm font-medium mb-3">Recipients</label>
                                <div className="grid grid-cols-3 gap-3">
                                    <button onClick={() => setData('recipients', 'all')} className={`p-3 rounded-lg border-2 ${data.recipients === 'all' ? 'border-rc-orange bg-rc-orange/5' : 'border-gray-200'}`}>
                                        <UserGroupIcon className="h-6 w-6 mx-auto text-rc-teal" />
                                        <span className="text-sm">All (58)</span>
                                    </button>
                                    <button onClick={() => setData('recipients', 'building')} className={`p-3 rounded-lg border-2 ${data.recipients === 'building' ? 'border-rc-orange bg-rc-orange/5' : 'border-gray-200'}`}>
                                        <BuildingOfficeIcon className="h-6 w-6 mx-auto text-rc-orange" />
                                        <span className="text-sm">Building</span>
                                    </button>
                                    <button onClick={() => setData('recipients', 'individual')} className={`p-3 rounded-lg border-2 ${data.recipients === 'individual' ? 'border-rc-orange bg-rc-orange/5' : 'border-gray-200'}`}>
                                        <ChatBubbleLeftIcon className="h-6 w-6 mx-auto text-rc-dark" />
                                        <span className="text-sm">Individual</span>
                                    </button>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="bg-white rounded-xl p-4 border-t-4 border-rc-teal">
                                <label className="block text-sm font-medium mb-3">Message</label>
                                <textarea value={data.message} onChange={(e) => setData('message', e.target.value)} rows={5} className="w-full px-4 py-2 border rounded-lg font-mono text-sm" placeholder="Type your message..." />
                                <div className="flex justify-between mt-2">
                                    <span className="text-xs text-gray-500">{data.message.length} chars</span>
                                    <button onClick={saveDraft} className="text-xs text-rc-teal">💾 Save Draft</button>
                                </div>
                            </div>

                            {/* Quick Replies */}
                            <div className="bg-white rounded-xl p-4">
                                <label className="block text-sm font-medium mb-2">Quick Replies</label>
                                <div className="flex gap-2 flex-wrap">
                                    {quickReplies.map(qr => (
                                        <button key={qr.text} onClick={() => setData('message', data.message + ' ' + qr.text)} className={`px-3 py-1 ${qr.color} text-white rounded-full text-xs`}>
                                            {qr.text}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Send Buttons */}
                            <div className="flex gap-3">
                                <button onClick={handleSend} className="flex-1 px-6 py-3 bg-rc-orange text-white rounded-lg">
                                    <PaperAirplaneIcon className="h-5 w-5 inline mr-2" /> Send Now
                                </button>
                                <button onClick={() => setShowScheduleCalendar(true)} className="px-6 py-3 bg-rc-teal text-white rounded-lg">
                                    📅 Schedule
                                </button>
                            </div>
                        </div>

                        {/* Right Panel */}
                        <div className="space-y-4">
                            {/* Template Preview */}
                            <div className="bg-white rounded-xl p-4 border-t-4 border-rc-orange">
                                <h3 className="font-semibold mb-3">Template Preview</h3>
                                {selectedTemplate ? (
                                    <div className="bg-rc-light rounded-lg p-3 text-sm">{selectedTemplate.content}</div>
                                ) : (
                                    <p className="text-sm text-gray-500">Select a template</p>
                                )}
                            </div>

                            {/* Drafts */}
                            {drafts.length > 0 && (
                                <div className="bg-white rounded-xl p-4">
                                    <h3 className="font-semibold mb-3">Drafts ({drafts.length})</h3>
                                    {drafts.map(draft => (
                                        <button key={draft.id} onClick={() => setData('message', draft.content)} className="block w-full text-left p-2 bg-rc-light rounded-lg text-sm mb-2">
                                            {draft.content.substring(0, 40)}...
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Templates Tab */}
                {activeTab === 'templates' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {templates.map(template => (
                            <button key={template.id} onClick={() => { setSelectedTemplate(template); setData('message', template.content); }} className="bg-white rounded-xl p-6 text-left border-t-4 border-rc-orange hover:shadow-lg">
                                <template.icon className={`h-8 w-8 ${template.color}`} />
                                {template.hasImage && <PhotoIcon className="h-4 w-4 text-rc-orange float-right" />}
                                <h3 className="font-semibold mt-3">{template.name}</h3>
                                <p className="text-sm text-gray-500">{template.description}</p>
                            </button>
                        ))}
                    </div>
                )}

                {/* Automation Tab */}
                {activeTab === 'automation' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {automationRules.map(rule => (
                            <div key={rule.id} className="bg-white rounded-xl p-6 border-t-4 border-rc-teal">
                                <div className="flex justify-between">
                                    <h3 className="font-semibold">{rule.name}</h3>
                                    <StatusBadge status={rule.status} />
                                </div>
                                <p className="text-sm text-gray-500 mt-2">{rule.trigger}</p>
                                <p className="text-xs text-rc-orange mt-2">Sent: {rule.sent}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Scheduled Tab */}
                {activeTab === 'scheduled' && (
                    <div className="bg-white rounded-xl overflow-hidden">
                        <table className="min-w-full divide-y">
                            <thead className="bg-rc-dark">
                                <tr>
                                    <th className="px-6 py-3 text-left text-white text-xs">Message</th>
                                    <th className="px-6 py-3 text-left text-white text-xs">Date</th>
                                    <th className="px-6 py-3 text-left text-white text-xs">Recipients</th>
                                    <th className="px-6 py-3 text-left text-white text-xs">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {scheduledMessages.map(msg => (
                                    <tr key={msg.id} className="hover:bg-rc-light">
                                        <td className="px-6 py-4 text-sm">{msg.message}</td>
                                        <td className="px-6 py-4 text-sm">{msg.date} {msg.time}</td>
                                        <td className="px-6 py-4 text-sm">{msg.recipients}</td>
                                        <td className="px-6 py-4"><button className="text-rc-orange text-sm">Cancel</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Conversation Tab */}
                {activeTab === 'conversation' && (
                    <div className="bg-white rounded-xl p-6 border-t-4 border-rc-orange max-w-2xl">
                        <h3 className="font-semibold mb-4">💬 Two-Way Conversation</h3>
                        <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
                            {conversation.map((msg, i) => (
                                <div key={i} className={`flex ${msg.from === 'landlord' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`${msg.from === 'landlord' ? 'bg-rc-orange text-white' : 'bg-rc-light text-rc-dark'} rounded-xl px-4 py-2 max-w-xs`}>
                                        <p className="text-sm">{msg.text}</p>
                                        <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input type="text" value={replyText} onChange={(e) => setReplyText(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg" placeholder="Type reply..." />
                            <button onClick={sendReply} className="px-4 py-2 bg-rc-orange text-white rounded-lg">Send</button>
                        </div>
                    </div>
                )}

                {/* Analytics Tab */}
                {activeTab === 'analytics' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-xl p-6">
                                <h3 className="font-semibold mb-4">📊 Read Receipts</h3>
                                <p className="text-3xl font-bold text-rc-teal">92%</p>
                                <p className="text-sm text-gray-500">220 of 238 delivered messages read</p>
                            </div>
                            <div className="bg-white rounded-xl p-6">
                                <h3 className="font-semibold mb-4">💰 Cost</h3>
                                <p className="text-3xl font-bold text-rc-orange">₱450</p>
                                <p className="text-sm text-gray-500">245 messages • ₱1.84 avg</p>
                            </div>
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

                {/* Groups Tab */}
                {activeTab === 'groups' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {contactGroups.map(group => (
                            <div key={group.name} className="bg-white rounded-xl p-6 border-t-4 border-rc-teal">
                                <div className="text-3xl">{group.icon}</div>
                                <h3 className="font-semibold mt-2">{group.name}</h3>
                                <p className="text-2xl font-bold text-rc-orange">{group.count}</p>
                                <button className="mt-3 text-sm text-rc-teal">Manage Group →</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Emergency Broadcast Modal */}
            {showEmergencyBroadcast && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowEmergencyBroadcast(false)} />
                    <div className="bg-white rounded-xl max-w-md w-full mx-4 z-10 p-6 border-t-4 border-red-600">
                        <h3 className="text-lg font-bold text-red-600">🚨 Emergency Broadcast</h3>
                        <p className="text-sm text-gray-500 mt-2">This will send an urgent message to ALL tenants immediately.</p>
                        <textarea rows={4} className="w-full px-4 py-2 border rounded-lg mt-4" placeholder="Emergency details..." />
                        <div className="flex gap-3 mt-4">
                            <button onClick={() => setShowEmergencyBroadcast(false)} className="flex-1 px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                            <button onClick={handleEmergencyBroadcast} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg">Send Emergency</button>
                        </div>
                    </div>
                </div>
            )}

            {/* A/B Test Modal */}
            {showABTest && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowABTest(false)} />
                    <div className="bg-white rounded-xl max-w-md w-full mx-4 z-10 p-6 border-t-4 border-rc-teal">
                        <h3 className="text-lg font-bold">🧪 A/B Test</h3>
                        <div className="space-y-4 mt-4">
                            {abTestVariants.map(v => (
                                <div key={v.variant} className="bg-rc-light rounded-lg p-4">
                                    <span className="px-2 py-1 bg-rc-orange text-white rounded text-xs">Variant {v.variant}</span>
                                    <p className="text-sm mt-2">{v.message}</p>
                                    <p className="text-xs text-rc-teal mt-1">{v.expected}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={runABTest} className="w-full px-4 py-2 bg-rc-orange text-white rounded-lg mt-4">Launch A/B Test</button>
                    </div>
                </div>
            )}

            {/* Schedule Modal */}
            {showScheduleCalendar && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowScheduleCalendar(false)} />
                    <div className="bg-white rounded-xl max-w-sm w-full mx-4 z-10 p-6">
                        <h3 className="text-lg font-bold mb-4">📅 Schedule Message</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm">Date</label>
                                <input type="date" className="w-full px-4 py-2 border rounded-lg mt-1" />
                            </div>
                            <div>
                                <label className="text-sm">Time</label>
                                <input type="time" className="w-full px-4 py-2 border rounded-lg mt-1" />
                            </div>
                            <button onClick={() => { setShowScheduleCalendar(false); setToast({ message: 'Message scheduled!', type: 'success' }); }} className="w-full px-4 py-2 bg-rc-orange text-white rounded-lg">Schedule</button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}