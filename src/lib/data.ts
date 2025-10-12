
import type { User } from "@/context/user-context";

export interface Member {
  id: string;
  name: string;
  avatar: string;
  contact: string;
  role: string;
  status: "Active" | "Inactive";
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
  projectType: "New Construction" | "Renovation" | "Interior Design";
  createdBy?: string;
  personalDetails?: {
    name: string;
    email: string;
    phoneNumber: string;
    currentAddress: string;
  };
  projectDetails?: {
    projectName: string;
    projectType: string;
    projectCost: string;
    dimension: string;
    floor: string;
    siteLocation: string;
    siteAddress: string;
  };
  projectAssign?: {
    architect: string;
    siteSupervisor: string;
  };
  projectId?: string; // from backend
}

export interface Lead {
  organization: string;
  leadId: string;
  fullName: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  pincode: string;
  tokenAmount: string;
  level: string;
  profileImage: string;
  coverImage: string;
  siteImages: string[];
}

export async function getProjects(
  user: User,
): Promise<{ success: boolean; data?: Project[]; message?: string }> {
  try {
    const res = await fetch(`/api/projects`, {
      headers: {
        "x-user": JSON.stringify(user),
      },
    });
    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({ message: "Failed to fetch projects and parse error" }));
      return {
        success: false,
        message: errorData.message || "Failed to fetch projects",
      };
    }
    const data = (await res.json()) as { success: boolean; projects: Project[] };
    return { success: true, data: data.projects };
  } catch (error) {
    console.error("Get projects action failed:", error);
    return {
      success: false,
      message: "An unexpected error occurred while fetching projects.",
    };
  }
}

export async function getProjectDetails(
  projectId: string,
  user: User,
): Promise<Project | null> {
  try {
    const res = await fetch(`/api/projects/${projectId}`, {
      headers: {
        "x-user": JSON.stringify(user),
      },
    });
    if (!res.ok) {
      console.error(
        `Failed to fetch project details for ${projectId}, status: ${res.status}`,
      );
      return null;
    }
    const data = (await res.json()) as { success: boolean; data: Project; message?: string };
    if (data.success) {
      return data.data;
    }
    console.error(
      `API returned success:false for project ${projectId}`,
      data.message,
    );
    return null;
  } catch (error) {
    console.error(`Error in getProjectDetails for ${projectId}:`, error);
    return null;
  }
}
