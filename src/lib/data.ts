
import { Member } from "@/components/view-members-sheet";

export interface Department {
    name: string;
    admin: string;
    members: Member[];
}

export interface Project {
    id: string;
    name: string;
    city: string;
    contact: string;
    startDate: string;
    status: string;
    statusColor: string;
    image: string;
    progress: number;
    projectType: 'New Construction' | 'Renovation' | 'Interior Design';
}

const mockProjects: Project[] = [
    {
        id: "CHA2024",
        name: "Charan Project",
        city: "Mysuru",
        contact: "admin@abc.com | +91 1234567890",
        startDate: "21st Sept 2024",
        status: "On Going",
        statusColor: "text-green-600",
        image: "https://placehold.co/59x59",
        progress: 75,
        projectType: "New Construction",
    },
    {
        id: "YAS2024",
        name: "Yash Project",
        city: "Mysuru",
        contact: "admin@abc.com | +91 1234567890",
        startDate: "21st Sept 2024",
        status: "Delay",
        statusColor: "text-red-600",
        image: "https://placehold.co/59x59",
        progress: 25,
        projectType: "Renovation",
    },
    {
        id: "CHA2024-2",
        name: "Charan Project",
        city: "Mysuru",
        contact: "admin@abc.com | +91 1234567890",
        startDate: "21st Sept 2024",
        status: "On Going",
        statusColor: "text-green-600",
        image: "https://placehold.co/59x59",
        progress: 50,
        projectType: "Interior Design",
    },
    {
        id: "CHA2024-3",
        name: "Charan Project",
        city: "Mysuru",
        contact: "admin@abc.com | +91 1234567890",
        startDate: "21st Sept 2024",
        status: "Completed",
        statusColor: "text-cyan-500",
        image: "https://placehold.co/59x59",
        progress: 100,
        projectType: "New Construction",
    },
];

const mockProjectDetails = {
    id: "YAS2024",
    name: "Yash",
    coverImage: "https://placehold.co/1216x144",
    profileImage: "https://placehold.co/94x94",
    progress: 25,
    personalInfo: {
        name: "Yash",
        clientId: "YAS2024",
        phone: "1234567890",
        email: "yash69@gmail.com",
        address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
    },
    projectInfo: {
        cost: "1.5 cr",
        duration: {
            start: "25 May 2024",
            end: "1 Dec 2024"
        },
        dimension: "1200 Sq. ft",
        floors: "G+1",
        status: "On going",
        locationLink: "https://maps.google.com"
    },
    visuals: {
        "3d": [
            "https://placehold.co/68x68",
            "https://placehold.co/69x68",
            "https://placehold.co/69x68",
            "https://placehold.co/69x68",
        ],
        gallery: Array(24).fill("https://placehold.co/68x68"),
    },
    materials: Array(6).fill({
        name: "Tata Steel",
        image: "https://placehold.co/67x67",
        description: "Brand: TATA, Diameter: 32 mm & above, Single Piece Length: 12 meter...",
    }),
    files: {
        initial: [{ id: 'init-1', name: "Initial Layout", date: "28 July 2024", version: "V 1", history: [] }],
        costing: [
            { id: 'cost-1', name: "Tentative Quotation", date: "28 July 2024", version: "V 1", history: [] },
            { id: 'cost-2', name: "Bill of Quantity", date: "28 July 2024", version: "V 1", history: [] },
        ],
        architecture: [
            { id: 'arch-1', name: "Architecture Schematic Drawing", date: "28 July 2024", version: "V 1", history: [] },
            { id: 'arch-2', name: "Architecture Concept Design", date: "28 July 2024", version: "V 2", history: [{ name: "Architecture Concept Design", date: "27 July 2024", version: "V 1"}] },
            { id: 'arch-3', name: "Interior Concept Design", date: "28 July 2024", version: "V 1", history: [] },
        ],
        structure: [
            { id: 'struct-1', name: "Soil Testing Report", date: "28 July 2024", version: "V 1", history: [] },
            { id: 'struct-2', name: "Structure Analysis Report", date: "28 July 2024", version: "V 1", history: [] },
        ],
        sanction: [{ id: 'sanc-1', name: "Sanction Drawing", date: "28 July 2024", version: "V 1", history: [] }],
        construction: [
            { id: 'cons-1', name: "Tender Drawing", date: "28 July 2024", version: "V 1", history: [] },
            { id: 'cons-2', name: "Structure GFC Drawing", date: "28 July 2024", version: "V 1", history: [] },
            { id: 'cons-3', name: "Civil GFC Drawing", date: "28 July 2024", version: "V 1", history: [] },
            { id: 'cons-4', name: "Architecture GFC Drawing", date: "28 July 2024", version: "V 1", history: [] },
            { id: 'cons-5', name: "Interior GFC Drawing", date: "28 July 2024", version: "V 1", history: [] },
            { id: 'cons-6', name: "Electrical Drawing", date: "28 July 2024", version: "V 1", history: [] },
            { id: 'cons-7', name: "Plumbing Package", date: "28 July 2024", version: "V 1", history: [] },
            { id: 'cons-8', name: "Passive Cooling Package", date: "28 July 2024", version: "V 1", history: [] },
            { id: 'cons-9', name: "Miscellaneous Package", date: "28 July 2024", version: "V 1", history: [] },
        ],
    },
    timeline: {
        // Mock timeline data
    }
};

export async function getDepartments(): Promise<Department[]> {
    // This function is not currently used in a way that causes crashes,
    // but returning mock data ensures stability if it's used later.
    console.log('Using mock departments data.');
    return [];
}


export async function getProjects(): Promise<Project[]> {
    console.log('Using mock projects data.');
    return mockProjects;
}

export async function getProjectDetails(projectId: string) {
    console.log(`Using mock project details for ID: ${projectId}`);
    
    const mockProject = mockProjects.find(p => p.id === projectId);

    if (mockProject) {
        return {
            ...mockProjectDetails,
            id: mockProject.id,
            name: mockProject.name,
            progress: mockProject.progress,
            personalInfo: {
                ...mockProjectDetails.personalInfo,
                name: mockProject.name,
                clientId: mockProject.id,
                email: mockProject.contact.split(' | ')[0],
                phone: mockProject.contact.split(' | ')[1],
            }
        };
    }
    
    // Return a default mock object if no specific mock is found to prevent crashes
    console.warn(`No specific mock project found for ID: ${projectId}. Returning default mock.`);
    return mockProjectDetails;
}
