

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
}

const mockDepartments: Department[] = [
    { 
        name: "Super Admin",
        admin: "Balaji Naik",
        members: [
            { id: "1", name: "Balaji Naik", email: "balaji@habi.one", avatar: "https://placehold.co/56x56", contact: "balaji@astracore.com | +91 1234567890", role: "Admin", status: "Active", lastActive: "2 days ago" },
            { id: "2", name: "Priya Mehra", email: "priya.m@example.com", avatar: "https://placehold.co/56x56", contact: "priya@astracore.com | +91 9876543210", role: "Admin", status: "Active", lastActive: "2 days ago" }
        ],
    },
    { 
        name: "Sales",
        admin: "Balaji Naik",
        members: [
            { id: "3", name: "Rohan Sharma", email: "rohan.s@example.com", avatar: "https://placehold.co/56x56", contact: "rohan@astracore.com | +91 1234567891", role: "Sales Executive", status: "Active", lastActive: "1 day ago" },
            { id: "4", name: "Anjali Gupta", email: "anjali.g@example.com", avatar: "https://placehold.co/56x56", contact: "anjali@astracore.com | +91 1234567892", role: "Sales Manager", status: "Active", lastActive: "3 hours ago" },
            { id: "5", name: "Vikram Singh", email: "vikram.s@example.com", avatar: "https://placehold.co/56x56", contact: "vikram@astracore.com | +91 1234567893", role: "Sales Head", status: "Inactive", lastActive: "1 week ago" }
        ],
    },
    { 
        name: "Software Development",
        admin: "Balaji Naik",
        members: Array.from({ length: 12 }, (_, i) => ({
            id: `dev-${i+1}`,
            name: `Dev ${i+1}`,
            email: `dev${i+1}@example.com`,
            avatar: `https://placehold.co/56x56?text=D${i+1}`,
            contact: `dev${i+1}@astracore.com | +91 888888888${i}`,
            role: "Software Engineer",
            status: "Active",
            lastActive: `${i+1} hours ago`
        })),
    },
    { 
        name: "Design",
        admin: "Balaji Naik",
        members: Array.from({ length: 4 }, (_, i) => ({
            id: `design-${i+1}`,
            name: `Designer ${i+1}`,
            email: `designer${i+1}@example.com`,
            avatar: `https://placehold.co/56x56?text=DS${i+1}`,
            contact: `design${i+1}@astracore.com | +91 777777777${i}`,
            role: "UI/UX Designer",
            status: "Active",
            lastActive: `${i+1} days ago`
        })),
    },
    { 
        name: "Support & Feedback",
        admin: "Balaji Naik", 
        members: Array.from({ length: 20 }, (_, i) => ({
            id: `support-${i+1}`,
            name: `Support ${i+1}`,
            email: `support${i+1}@example.com`,
            avatar: `https://placehold.co/56x56?text=S${i+1}`,
            contact: `support${i+1}@astracore.com | +91 666666666${i}`,
            role: "Support Specialist",
            status: "Active",
            lastActive: `${i+1} mins ago`
        })),
    },
    { 
        name: "Human Resources",
        admin: "Balaji Naik",
        members: [],
    },
];

const mockProjects: Project[] = [
    {
        id: "CHA2024",
        name: "Charan Project",
        city: "Mysuru",
        contact: "admin@abc.com | +91 1234567890",
        startDate: "21st Sept 2024",
        status: "On Going",
        statusColor: "text-green-600",
        image: "https://placehold.co/59x59"
    },
    {
        id: "YAS2024",
        name: "Yash Project",
        city: "Mysuru",
        contact: "admin@abc.com | +91 1234567890",
        startDate: "21st Sept 2024",
        status: "Delay",
        statusColor: "text-red-600",
        image: "https://placehold.co/59x59"
    },
    {
        id: "CHA2024-2",
        name: "Charan Project",
        city: "Mysuru",
        contact: "admin@abc.com | +91 1234567890",
        startDate: "21st Sept 2024",
        status: "On Going",
        statusColor: "text-green-600",
        image: "https://placehold.co/59x59"
    },
    {
        id: "CHA2024-3",
        name: "Charan Project",
        city: "Mysuru",
        contact: "admin@abc.com | +91 1234567890",
        startDate: "21st Sept 2024",
        status: "Completed",
        statusColor: "text-cyan-500",
        image: "https://placehold.co/59x59"
    },
];

export async function getDepartments(): Promise<Department[]> {
    try {
        // const response = await fetch('http://localhost:4000/api/v1/org-users');
        // if (!response.ok) {
        //     throw new Error('Failed to fetch departments');
        // }
        // const data = await response.json();
        // return data;
        
        // Using mock data for now
        return Promise.resolve(mockDepartments);
    } catch (error) {
        console.error('Error fetching departments:', error);
        return [];
    }
}


export async function getProjects(): Promise<Project[]> {
    try {
        const orgId = "6842c24e92a1c2ead0145c79"; // Using a static orgId for now
        const response = await fetch(`http://localhost:4000/api/v1/organizations/${orgId}/projects`);
        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        // You might need to map the response data to the Project interface
        return data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        // Returning mock data on error for now
        return mockProjects;
    }
}

export async function getProjectDetails(clientId: string) {
    try {
        const response = await fetch(`http://localhost:4000/api/v1/org-clients/${clientId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch project details');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching project details for ${clientId}:`, error);
        return null;
    }
}