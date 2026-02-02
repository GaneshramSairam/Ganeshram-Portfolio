import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext(null);

// Default data structure
const defaultData = {
    profile: {
        name: 'Ganeshram Sairam',
        title: '',
        subtitle: '3+ Years Delivering Enterprise Solutions Across Multiple Industries',
        roles: [
            'EWM Consultant',
            'Prompt Engineer',
            'Software Developer',
            'Certified Yoga Teacher',
            'Vocalist',
        ],
        photoUrl: '/assets/profile.png',
    },
    softwareSkills: [
        'React',
        'JavaScript',
        'Firebase',
        'GitHub',
        'Tailwind CSS',
        'Vite',
    ],
    stats: [
        { value: '4+', label: 'Client Go-Lives' },
        { value: '3', label: 'SAP Certifications' },
        { value: '3', label: 'Industries Served' },
        { value: '3+', label: 'Years Experience' },
    ],
    projects: [
        {
            id: '1',
            title: 'SAP Implementation Consultant',
            industry: 'Global Delivery',
            solution: 'Domestic & International Engagement',
            deliverables: [
                'Executed end-to-end SAP EWM / STRM implementations for diverse domestic and international clients.',
                'Delivered specialized solutions across Auto Ancillary, Electronics, and Pharmaceutical industries.',
                'Led critical go-live phases, user acceptance testing (UAT), and hyper-care support.',
            ],
            technicalScope: 'SAP S/4HANA Public & Private Cloud, EWM, Cross-module Integration (MM/PP/SD)',
        },
    ],
    certifications: [
        {
            id: '1',
            name: 'SAP Certified - Implementation Consultant - SAP S/4HANA Cloud Public Edition',
            credentialUrl: 'https://www.credly.com/badges/1242c0cb-6090-438f-b918-d2dc46f3c18b',
        },
        {
            id: '2',
            name: 'SAP Certified - SAP S/4HANA Cloud Private Edition, Extended Warehouse Management',
            credentialUrl: 'https://www.credly.com/badges/8e7b7fce-f772-45f0-b6b5-50169a86f19d',
        },
        {
            id: '3',
            name: 'SAP Certified - SAP S/4HANA Cloud Private Edition, Sourcing and Procurement',
            credentialUrl: 'https://www.credly.com/badges/16c4ed83-5988-4252-afa8-4378df45f79e',
        },
    ],
    awards: [
        {
            id: '1',
            title: 'EY Extraordinaires - Collaboration Extraordinaire',
            date: 'October 24, 2024',
            issuedBy: 'Rohan Sachdev, Consulting Services Leader, EY',
            description: 'Recognized for forming reliable partnerships in pursuit of collective success and commitment to excellence',
            certificateUrl: '/assets/ey-collaboration-award.jpg',
        },
    ],
    sapProducts: [
        'SAP Extended Warehouse Management (EWM)',
        'SAP S/4HANA (Public & Private Cloud)',
        'SAP Warehouse Management (WM)',
        'SAP Materials Management (MM)',
        'SAP ECC 6.0',
    ],
    technicalExpertise: [
        'End-to-end EWM implementation',
        'Cross-module integration (MM, PP, SD)',
        'WRICEF object development',
        'Data migration strategies',
        'Warehouse process optimization',
        'System Integration Testing (SIT) & UAT',
        'Hyper-care & production support',
    ],
    liveProjects: [
        {
            id: '1',
            title: "Narayani's Nova Gallery",
            role: 'AI Solution Architect & Prompt Engineer',
            description: 'Developed a curated jewelry e-commerce platform.',
            link: 'https://nova-gallery.web.app',
            github: 'https://github.com/GaneshramSairam/narayani-nova-gallery',
            tech: ['Firebase', 'React', 'E-commerce'],
        },
        {
            id: '2',
            title: 'QueueUp',
            role: 'AI Solution Architect & Prompt Engineer',
            description: 'Created a specialized e-commerce application using AI-driven development.',
            link: 'https://queueup.in',
            github: 'https://github.com/TEAMQUEUEUP/queueup-project',
            tech: ['Firebase', 'Razorpay API', 'AI-driven'],
        },
    ],
    resumeUrl: '',
    socialLinks: {
        linkedin: 'https://linkedin.com/in/ganeshram-sairam',
        github: 'https://github.com/ganeshram-sairam',
        email: 'ganeshram.sairam@example.com',
    },
    clientLogos: [
        { id: '1', name: 'JK Fenner', domain: 'jkfenner.com' },
        { id: '2', name: 'Lucas TVS', domain: 'lucastvs.com' },
        { id: '3', name: 'Rosenberger', domain: 'rosenberger.com' },
        { id: '4', name: 'Neuland Laboratories Limited', domain: 'neulandlabs.com' },
        { id: '5', name: 'Munitions India', domain: 'munitionsindia.in' },
    ],

};

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(defaultData);
    const [isLoading, setIsLoading] = useState(true);

    // Load data from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem('portfolio_data_v3');
        if (savedData) {
            try {
                setData(JSON.parse(savedData));
            } catch (e) {
                console.error('Failed to parse saved data:', e);
            }
        }
        setIsLoading(false);
    }, []);

    // Save data to localStorage whenever it changes
    const saveData = (newData) => {
        setData(newData);
        localStorage.setItem('portfolio_data_v3', JSON.stringify(newData));
    };

    // Update profile
    const updateProfile = (profile) => {
        saveData({ ...data, profile });
    };

    // Update stats
    const updateStats = (stats) => {
        saveData({ ...data, stats });
    };

    // Project CRUD
    const addProject = (project) => {
        const newProject = { ...project, id: Date.now().toString() };
        saveData({ ...data, projects: [...data.projects, newProject] });
    };

    const updateProject = (id, updatedProject) => {
        saveData({
            ...data,
            projects: data.projects.map((p) => (p.id === id ? { ...p, ...updatedProject } : p)),
        });
    };

    const deleteProject = (id) => {
        saveData({ ...data, projects: data.projects.filter((p) => p.id !== id) });
    };

    // Certification CRUD
    const addCertification = (cert) => {
        const newCert = { ...cert, id: Date.now().toString() };
        saveData({ ...data, certifications: [...data.certifications, newCert] });
    };

    const updateCertification = (id, updatedCert) => {
        saveData({
            ...data,
            certifications: data.certifications.map((c) => (c.id === id ? { ...c, ...updatedCert } : c)),
        });
    };

    const deleteCertification = (id) => {
        saveData({ ...data, certifications: data.certifications.filter((c) => c.id !== id) });
    };

    // Award CRUD
    const addAward = (award) => {
        const newAward = { ...award, id: Date.now().toString() };
        saveData({ ...data, awards: [...data.awards, newAward] });
    };

    const updateAward = (id, updatedAward) => {
        saveData({
            ...data,
            awards: data.awards.map((a) => (a.id === id ? { ...a, ...updatedAward } : a)),
        });
    };

    const deleteAward = (id) => {
        saveData({ ...data, awards: data.awards.filter((a) => a.id !== id) });
    };

    // Skills update
    const updateSapProducts = (sapProducts) => {
        saveData({ ...data, sapProducts });
    };

    const updateTechnicalExpertise = (technicalExpertise) => {
        saveData({ ...data, technicalExpertise });
    };

    // Social links
    const updateSocialLinks = (socialLinks) => {
        saveData({ ...data, socialLinks });
    };

    // Resume
    const updateResumeUrl = (resumeUrl) => {
        saveData({ ...data, resumeUrl });
    };

    return (
        <DataContext.Provider
            value={{
                data,
                isLoading,
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
                updateResumeUrl,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
