

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
        const response = await fetch('http://localhost:4000/api/v1/org-users');
        if (!response.ok) {
            throw new Error('Failed to fetch departments');
        }
        const data = await response.json();
        return data;
        
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

export async function getProjectDetails(projectId: string) {
    try {
        const orgId = "6842c24e92a1c2ead0145c79"; // Using a static orgId for now
        const response = await fetch(`http://localhost:4000/api/v1/organizations/${orgId}/projects/${projectId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch project details');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching project details for ${projectId}:`, error);
        return null;
    }
}
