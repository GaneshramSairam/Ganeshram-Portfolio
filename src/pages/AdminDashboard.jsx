import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaUser,
    FaProjectDiagram,
    FaCertificate,
    FaTrophy,
    FaCode,
    FaFileAlt,
    FaLink,
    FaSignOutAlt,
    FaHome,
    FaPlus,
    FaEdit,
    FaTrash,
    FaSave,
    FaTimes,
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const { logout } = useAuth();
    const navigate = useNavigate();
    const {
        data,
        updateProfile,
        updateStats,
        addProject,
        updateProject,
        deleteProject,
        addCertification,
        updateCertification,
        deleteCertification,
        addAward,
        updateAward,
        deleteAward,
        updateSapProducts,
        updateTechnicalExpertise,
        updateSocialLinks,
    } = useData();

    const handleLogout = () => {
        logout();
        navigate('/admin');
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: FaUser },
        { id: 'projects', label: 'Projects', icon: FaProjectDiagram },
        { id: 'certifications', label: 'Certifications', icon: FaCertificate },
        { id: 'awards', label: 'Awards', icon: FaTrophy },
        { id: 'skills', label: 'Skills', icon: FaCode },
        { id: 'resume', label: 'Resume', icon: FaFileAlt },
        { id: 'social', label: 'Social Links', icon: FaLink },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-primary text-white flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-bold">Admin Dashboard</h1>
                    <p className="text-white/60 text-sm mt-1">Manage your portfolio</p>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === tab.id
                                ? 'bg-white/20 text-white'
                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <tab.icon className="text-lg" />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10 space-y-2">
                    <a
                        href="/"
                        target="_blank"
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                    >
                        <FaHome className="text-lg" />
                        <span>View Portfolio</span>
                    </a>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-300 hover:bg-red-500/20 transition-colors"
                    >
                        <FaSignOutAlt className="text-lg" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'profile' && (
                            <ProfileTab data={data} updateProfile={updateProfile} updateStats={updateStats} />
                        )}
                        {activeTab === 'projects' && (
                            <ProjectsTab
                                projects={data.projects}
                                addProject={addProject}
                                updateProject={updateProject}
                                deleteProject={deleteProject}
                            />
                        )}
                        {activeTab === 'certifications' && (
                            <CertificationsTab
                                certifications={data.certifications}
                                addCertification={addCertification}
                                updateCertification={updateCertification}
                                deleteCertification={deleteCertification}
                            />
                        )}
                        {activeTab === 'awards' && (
                            <AwardsTab
                                awards={data.awards}
                                addAward={addAward}
                                updateAward={updateAward}
                                deleteAward={deleteAward}
                            />
                        )}
                        {activeTab === 'skills' && (
                            <SkillsTab
                                sapProducts={data.sapProducts}
                                technicalExpertise={data.technicalExpertise}
                                updateSapProducts={updateSapProducts}
                                updateTechnicalExpertise={updateTechnicalExpertise}
                            />
                        )}
                        {activeTab === 'resume' && (
                            <ResumeTab data={data} />
                        )}
                        {activeTab === 'social' && (
                            <SocialTab socialLinks={data.socialLinks} updateSocialLinks={updateSocialLinks} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

// Profile Tab Component
const ProfileTab = ({ data, updateProfile, updateStats }) => {
    const [profile, setProfile] = useState(data.profile);
    const [stats, setStats] = useState(data.stats);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        updateProfile(profile);
        updateStats(stats);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Profile Settings</h2>

            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title (Optional - leave blank to hide)
                        </label>
                        <input
                            type="text"
                            value={profile.title}
                            onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="e.g., SAP Consultant | Software Developer"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                    <input
                        type="text"
                        value={profile.subtitle}
                        onChange={(e) => setProfile({ ...profile, subtitle: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Photo URL</label>
                    <input
                        type="url"
                        value={profile.photoUrl}
                        onChange={(e) => setProfile({ ...profile, photoUrl: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="https://example.com/photo.jpg"
                    />
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Stats Cards</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat, index) => (
                            <div key={index} className="space-y-2">
                                <input
                                    type="text"
                                    value={stat.value}
                                    onChange={(e) => {
                                        const newStats = [...stats];
                                        newStats[index] = { ...stat, value: e.target.value };
                                        setStats(newStats);
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center font-bold"
                                    placeholder="Value"
                                />
                                <input
                                    type="text"
                                    value={stat.label}
                                    onChange={(e) => {
                                        const newStats = [...stats];
                                        newStats[index] = { ...stat, label: e.target.value };
                                        setStats(newStats);
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center text-sm"
                                    placeholder="Label"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                        <FaSave />
                        Save Changes
                    </button>
                    {saved && <span className="text-green-600 font-medium">✓ Saved successfully!</span>}
                </div>
            </div>
        </div>
    );
};

// Projects Tab Component
const ProjectsTab = ({ projects, addProject, updateProject, deleteProject }) => {
    const [editingId, setEditingId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const emptyProject = {
        title: '',
        industry: '',
        solution: '',
        deliverables: [''],
        technicalScope: '',
    };

    const [formData, setFormData] = useState(emptyProject);

    const handleSubmit = () => {
        if (editingId) {
            updateProject(editingId, formData);
            setEditingId(null);
        } else {
            addProject(formData);
            setShowAddForm(false);
        }
        setFormData(emptyProject);
    };

    const handleEdit = (project) => {
        setFormData(project);
        setEditingId(project.id);
        setShowAddForm(true);
    };

    const handleAddDeliverable = () => {
        setFormData({ ...formData, deliverables: [...formData.deliverables, ''] });
    };

    const handleRemoveDeliverable = (index) => {
        setFormData({
            ...formData,
            deliverables: formData.deliverables.filter((_, i) => i !== index),
        });
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">Projects</h2>
                <button
                    onClick={() => {
                        setShowAddForm(true);
                        setFormData(emptyProject);
                        setEditingId(null);
                    }}
                    className="btn-primary flex items-center gap-2"
                >
                    <FaPlus />
                    Add Project
                </button>
            </div>

            {/* Add/Edit Form */}
            {showAddForm && (
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">
                        {editingId ? 'Edit Project' : 'Add New Project'}
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Project Title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                            />
                            <input
                                type="text"
                                placeholder="Industry"
                                value={formData.industry}
                                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Solution"
                            value={formData.solution}
                            onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Deliverables</label>
                            {formData.deliverables.map((del, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={del}
                                        onChange={(e) => {
                                            const newDels = [...formData.deliverables];
                                            newDels[index] = e.target.value;
                                            setFormData({ ...formData, deliverables: newDels });
                                        }}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                        placeholder="Deliverable item"
                                    />
                                    <button
                                        onClick={() => handleRemoveDeliverable(index)}
                                        className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={handleAddDeliverable}
                                className="text-primary hover:text-primary-600 text-sm font-medium"
                            >
                                + Add Deliverable
                            </button>
                        </div>
                        <textarea
                            placeholder="Technical Scope"
                            value={formData.technicalScope}
                            onChange={(e) => setFormData({ ...formData, technicalScope: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                            rows={3}
                        />
                        <div className="flex gap-2">
                            <button onClick={handleSubmit} className="btn-primary flex items-center gap-2">
                                <FaSave />
                                {editingId ? 'Update' : 'Add'} Project
                            </button>
                            <button
                                onClick={() => {
                                    setShowAddForm(false);
                                    setEditingId(null);
                                    setFormData(emptyProject);
                                }}
                                className="btn-outline flex items-center gap-2"
                            >
                                <FaTimes />
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Projects List */}
            <div className="grid gap-4">
                {projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-primary">{project.title}</h3>
                                <span className="text-sm text-accent font-medium">{project.industry}</span>
                                <p className="text-gray-600 mt-1">{project.solution}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="p-2 text-primary hover:bg-primary-50 rounded-lg"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => deleteProject(project.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Certifications Tab Component
const CertificationsTab = ({ certifications, addCertification, updateCertification, deleteCertification }) => {
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ name: '', credentialUrl: '' });

    const handleSubmit = () => {
        if (editingId) {
            updateCertification(editingId, formData);
        } else {
            addCertification(formData);
        }
        setShowForm(false);
        setEditingId(null);
        setFormData({ name: '', credentialUrl: '' });
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">Certifications</h2>
                <button
                    onClick={() => {
                        setShowForm(true);
                        setEditingId(null);
                        setFormData({ name: '', credentialUrl: '' });
                    }}
                    className="btn-primary flex items-center gap-2"
                >
                    <FaPlus />
                    Add Certification
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6 space-y-4">
                    <input
                        type="text"
                        placeholder="Certification Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                    <input
                        type="url"
                        placeholder="Credential URL"
                        value={formData.credentialUrl}
                        onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                    <div className="flex gap-2">
                        <button onClick={handleSubmit} className="btn-primary">
                            {editingId ? 'Update' : 'Add'}
                        </button>
                        <button onClick={() => setShowForm(false)} className="btn-outline">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {certifications.map((cert) => (
                    <div key={cert.id} className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-gray-800">{cert.name}</h3>
                            {cert.credentialUrl && (
                                <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-accent">
                                    View Credential →
                                </a>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setFormData(cert);
                                    setEditingId(cert.id);
                                    setShowForm(true);
                                }}
                                className="p-2 text-primary hover:bg-primary-50 rounded-lg"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => deleteCertification(cert.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Awards Tab Component
const AwardsTab = ({ awards, addAward, updateAward, deleteAward }) => {
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        issuedBy: '',
        description: '',
        certificateUrl: '',
    });

    const handleSubmit = () => {
        if (editingId) {
            updateAward(editingId, formData);
        } else {
            addAward(formData);
        }
        setShowForm(false);
        setEditingId(null);
        setFormData({ title: '', date: '', issuedBy: '', description: '', certificateUrl: '' });
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">Awards & Recognition</h2>
                <button
                    onClick={() => {
                        setShowForm(true);
                        setEditingId(null);
                    }}
                    className="btn-primary flex items-center gap-2"
                >
                    <FaPlus />
                    Add Award
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6 space-y-4">
                    <input
                        type="text"
                        placeholder="Award Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="px-4 py-3 border border-gray-300 rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Issued By"
                            value={formData.issuedBy}
                            onChange={(e) => setFormData({ ...formData, issuedBy: e.target.value })}
                            className="px-4 py-3 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <textarea
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        rows={3}
                    />
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Certificate Image</label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setFormData({ ...formData, certificateUrl: reader.result });
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary hover:file:bg-primary-100"
                            />
                        </div>
                        <input
                            type="url"
                            placeholder="Or enter Image URL"
                            value={formData.certificateUrl}
                            onChange={(e) => setFormData({ ...formData, certificateUrl: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
                        />
                        {formData.certificateUrl && (
                            <div className="mt-2">
                                <p className="text-xs text-gray-500 mb-1">Preview:</p>
                                <img
                                    src={formData.certificateUrl}
                                    alt="Preview"
                                    className="h-20 w-auto object-contain border border-gray-200 rounded"
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button onClick={handleSubmit} className="btn-primary">
                            {editingId ? 'Update' : 'Add'}
                        </button>
                        <button onClick={() => setShowForm(false)} className="btn-outline">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {awards.map((award) => (
                    <div key={award.id} className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-primary">{award.title}</h3>
                                <p className="text-sm text-gray-500">{award.date} • {award.issuedBy}</p>
                                <p className="text-gray-600 mt-2">{award.description}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setFormData(award);
                                        setEditingId(award.id);
                                        setShowForm(true);
                                    }}
                                    className="p-2 text-primary hover:bg-primary-50 rounded-lg"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => deleteAward(award.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Skills Tab Component
const SkillsTab = ({ sapProducts, technicalExpertise, updateSapProducts, updateTechnicalExpertise }) => {
    const [products, setProducts] = useState(sapProducts);
    const [expertise, setExpertise] = useState(technicalExpertise);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        updateSapProducts(products.filter((p) => p.trim()));
        updateTechnicalExpertise(expertise.filter((e) => e.trim()));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Skills & Expertise</h2>

            <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">SAP Products</h3>
                    <div className="space-y-2">
                        {products.map((product, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={product}
                                    onChange={(e) => {
                                        const newProducts = [...products];
                                        newProducts[index] = e.target.value;
                                        setProducts(newProducts);
                                    }}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                />
                                <button
                                    onClick={() => setProducts(products.filter((_, i) => i !== index))}
                                    className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => setProducts([...products, ''])}
                            className="text-primary hover:text-primary-600 text-sm font-medium"
                        >
                            + Add Product
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Technical Expertise</h3>
                    <div className="space-y-2">
                        {expertise.map((skill, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={skill}
                                    onChange={(e) => {
                                        const newExpertise = [...expertise];
                                        newExpertise[index] = e.target.value;
                                        setExpertise(newExpertise);
                                    }}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                />
                                <button
                                    onClick={() => setExpertise(expertise.filter((_, i) => i !== index))}
                                    className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => setExpertise([...expertise, ''])}
                            className="text-primary hover:text-primary-600 text-sm font-medium"
                        >
                            + Add Skill
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                        <FaSave />
                        Save Changes
                    </button>
                    {saved && <span className="text-green-600 font-medium">✓ Saved successfully!</span>}
                </div>
            </div>
        </div>
    );
};

// Resume Tab Component
const ResumeTab = ({ data }) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const handlePreview = async () => {
        setIsGenerating(true);
        const { generateResumePDF } = await import('../utils/generateResume.js');
        const doc = generateResumePDF(data);
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
        setIsGenerating(false);
    };

    const handleDownload = async () => {
        setIsGenerating(true);
        const { downloadResumePDF } = await import('../utils/generateResume.js');
        downloadResumePDF(data, `${data.profile.name.replace(/\s+/g, '_')}_Resume.pdf`);
        setIsGenerating(false);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Resume</h2>

            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
                <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-primary mb-3">📄 Dynamic Resume Generation</h3>
                    <p className="text-gray-600 mb-4">
                        Your resume is automatically generated from your portfolio data using jsPDF.
                        Any changes you make to your profile, projects, certifications, skills, or awards
                        will be reflected in the downloaded resume.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={handlePreview}
                            disabled={isGenerating}
                            className="btn-outline flex items-center gap-2 disabled:opacity-50"
                        >
                            {isGenerating ? 'Generating...' : '👁️ Preview Resume'}
                        </button>
                        <button
                            onClick={handleDownload}
                            disabled={isGenerating}
                            className="btn-primary flex items-center gap-2 disabled:opacity-50"
                        >
                            {isGenerating ? 'Generating...' : '⬇️ Download PDF'}
                        </button>
                    </div>
                </div>

                <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Resume Content Preview</h3>
                    <div className="space-y-4 text-sm text-gray-600">
                        <div className="flex items-start gap-3">
                            <span className="font-medium text-primary min-w-[120px]">Name:</span>
                            <span>{data.profile.name}</span>
                        </div>
                        {data.profile.title && (
                            <div className="flex items-start gap-3">
                                <span className="font-medium text-primary min-w-[120px]">Title:</span>
                                <span>{data.profile.title}</span>
                            </div>
                        )}
                        <div className="flex items-start gap-3">
                            <span className="font-medium text-primary min-w-[120px]">Summary:</span>
                            <span>{data.profile.subtitle}</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="font-medium text-primary min-w-[120px]">Projects:</span>
                            <span>{data.projects.length} projects listed</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="font-medium text-primary min-w-[120px]">Certifications:</span>
                            <span>{data.certifications.length} certifications listed</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="font-medium text-primary min-w-[120px]">Skills:</span>
                            <span>{data.sapProducts.length + data.technicalExpertise.length} skills listed</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="font-medium text-primary min-w-[120px]">Awards:</span>
                            <span>{data.awards.length} awards listed</span>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800 text-sm">
                        <strong>💡 Tip:</strong> To customize your resume, edit your Profile, Projects,
                        Certifications, Skills, and Awards sections. The resume PDF will automatically
                        include all your updated information.
                    </p>
                </div>
            </div>
        </div>
    );
};

// Social Links Tab Component
const SocialTab = ({ socialLinks, updateSocialLinks }) => {
    const [links, setLinks] = useState(socialLinks);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        updateSocialLinks(links);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Social Links</h2>

            <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
                    <input
                        type="url"
                        value={links.linkedin}
                        onChange={(e) => setLinks({ ...links, linkedin: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="https://linkedin.com/in/yourprofile"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
                    <input
                        type="url"
                        value={links.github}
                        onChange={(e) => setLinks({ ...links, github: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="https://github.com/yourusername"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                        type="email"
                        value={links.email}
                        onChange={(e) => setLinks({ ...links, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="your.email@example.com"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                        <FaSave />
                        Save Changes
                    </button>
                    {saved && <span className="text-green-600 font-medium">✓ Saved successfully!</span>}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
