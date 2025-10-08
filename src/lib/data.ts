
export interface Member {
    id: string;
    name: string;
    avatar: string;
    contact: string;
    role: string;
    status: 'Active' | 'Inactive';
    lastActive: string;
    email: string;
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
    createdBy?: string;
    personalDetails?: any;
    projectDetails?: any;
    projectId?: string; // from backend
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

export async function getProjects(user: any): Promise<{ success: boolean; data?: any; message?: string }> {
    try {
        const res = await fetch(`/api/projects`, {
            headers: {
                'x-user': JSON.stringify(user)
            }
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: 'Failed to fetch projects and parse error' }));
            return { success: false, message: errorData.message || 'Failed to fetch projects' };
        }
        const data = await res.json();
        return { success: true, data: data.projects };
    } catch (error) {
        console.error('Get projects action failed:', error);
        return { success: false, message: 'An unexpected error occurred while fetching projects.' };
    }
}

export async function getProjectDetails(projectId: string, user: any) {
    try {
        const res = await fetch(`/api/projects/${projectId}`, {
            headers: {
                'x-user': JSON.stringify(user)
            }
        });
        if (!res.ok) {
            console.error(`Failed to fetch project details for ${projectId}, status: ${res.status}`);
            return null;
        }
        const data = await res.json();
        if (data.success) {
            return data.data;
        }
        console.error(`API returned success:false for project ${projectId}`, data.message);
        return null;

    } catch (error) {
        console.error(`Error in getProjectDetails for ${projectId}:`, error);
        return null;
    }
}
