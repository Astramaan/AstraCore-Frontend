
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  Code,
  Palette,
  Search,
  Shield,
  Users,
  ChevronLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  ViewMembersSheet,
  type Role,
} from "@/components/view-members-sheet";
import { CreateDepartmentSheet } from "@/components/create-department-sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/context/user-context";
import { AddMemberSheet } from "@/components/add-member-sheet";
import { useToast } from "@/components/ui/use-toast";

const iconMap: { [key: string]: React.ElementType } = {
  "Super Admin": Shield,
  "Sales": Briefcase,
  "Software Development": Code,
  "Design": Palette,
  "Site Supervisor": Users,
  "Architect": Palette,
  "Project Manager": Briefcase,
  "Support & Feedback": Users,
  "Human Resources": Users,
  "Org Admin": Users,
  default: Users,
};

const RoleCard = ({
  role,
  onViewMembers,
}: {
  role: Role;
  onViewMembers: (role: Role) => void;
}) => {
  const Icon = iconMap[role.name] || iconMap.default;
  return (
    <>
      {/* Desktop & Tablet View */}
      <div className="hidden lg:grid lg:grid-cols-[1.2fr_auto_1fr_auto_1fr] items-stretch py-4 gap-4">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${role.bgColor}`}
          >
            <Icon className="w-6 h-6 text-foreground" />
          </div>
          <p className="text-xl font-semibold">{role.name}</p>
        </div>

        <Separator orientation="vertical" className="self-stretch" />

        <div className="flex flex-col justify-center gap-2">
          <p className="text-lg">
            <span className="text-muted-foreground">Admin: </span>
            <span className="text-foreground font-medium">{role.admin}</span>
          </p>
          <p className="text-lg">
            <span className="text-muted-foreground">Active Members: </span>
            <span className="text-foreground font-medium">
              {String(role.active).padStart(2, "0")}
            </span>
          </p>
        </div>

        <Separator orientation="vertical" className="self-stretch" />

        <div className="flex items-center justify-between gap-4">
          <p className="text-lg">
            <span className="text-muted-foreground">Total Members: </span>
            <span className="text-foreground font-medium">
              {String(role.total).padStart(2, "0")}
            </span>
          </p>
          <Button
            className="h-14 px-10 rounded-full bg-background text-foreground dark:text-white hover:bg-primary/10 hover:text-primary text-lg font-medium"
            onClick={() => onViewMembers(role)}
          >
            View Members
          </Button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden flex flex-col py-4 gap-4">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${role.bgColor}`}
          >
            <Icon className="w-6 h-6 text-foreground" />
          </div>
          <p className="text-2xl font-semibold">{role.name}</p>
        </div>
        <div className="grid grid-cols-2 items-center gap-4 mt-2">
          <div>
            <p className="text-base text-muted-foreground">
              Admin:{" "}
              <span className="text-foreground font-medium block">
                {role.admin}
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-base text-muted-foreground">
              Active Members:{" "}
              <span className="text-foreground font-medium block">
                {String(role.active).padStart(2, "0")}
              </span>
            </p>
          </div>
          <div>
            <p className="text-base text-muted-foreground">
              Total Members:{" "}
              <span className="text-foreground font-medium block">
                {String(role.total).padStart(2, "0")}
              </span>
            </p>
          </div>
          <Button
            className="h-12 px-6 w-full rounded-full bg-background text-foreground dark:text-white hover:bg-muted text-base font-medium self-end"
            onClick={() => onViewMembers(role)}
          >
            View Members
          </Button>
        </div>
      </div>
      <Separator className="last:hidden" />
    </>
  );
};

export default function TeamsPageContent() {
  const router = useRouter();

  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;
    const fetchTeams = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/users/teams", {
          headers: { "x-user": JSON.stringify(user) },
        });
        const result = await res.json();
        if (result.success && Array.isArray(result.teams)) {
          const apiRoles: Role[] = result.teams.map((team: any) => {
            const adminMember = team.members.find(
              (m: any) => m.roleType === "ADMIN",
            );
            return {
              name: team.team,
              Icon: iconMap[team.team] || iconMap.default,
              bgColor: "bg-blue-300/30",
              admin: adminMember ? adminMember.name : "N/A",
              active: team.members.length,
              total: team.members.length,
              members: team.members.map((member: any) => ({
                id: member.userId,
                name: member.name,
                avatar: `https://i.pravatar.cc/150?u=${member.userId}`,
                contact: `${member.email || "N/A"} | ${member.mobileNumber || "N/A"}`,
                role: member.roleType,
                status: "Active",
                lastActive: "N/A",
                email: member.email || "N/A",
              })),
            };
          });
          setRoles(apiRoles);
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: result.message || "Failed to fetch teams.",
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Network Error",
          description: "An unexpected error occurred while fetching teams.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeams();
  }, [user, toast]);

  const filteredRoles = useMemo(() => {
    if (!searchTerm) return roles;
    return roles.filter(
      (role) =>
        role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.admin.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, roles]);

  const handleViewMembers = (role: Role) => {
    setSelectedRole(role);
  };

  const handleCloseSheet = () => {
    setSelectedRole(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="rounded-full h-[54px] px-6 text-lg bg-card hover:bg-muted hidden md:flex"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search Members"
              className="pl-12 h-14 rounded-full bg-card text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          {user?.roleType === "superAdmin" ? (
            <CreateDepartmentSheet />
          ) : (
            <AddMemberSheet />
          )}
        </div>
      </div>

      <Card className="rounded-[50px] overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <RoleCardSkeleton key={i} />
              ))
            ) : filteredRoles.length > 0 ? (
              filteredRoles.map((role) => (
                <RoleCard
                  key={role.name}
                  role={role}
                  onViewMembers={handleViewMembers}
                />
              ))
            ) : (
              <div className="text-center text-muted-foreground py-10">
                <p>No teams found.</p>
                {user?.roleType === "superAdmin" && (
                  <p>Click &ldquo;Create New Team&rdquo; to add one.</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <ViewMembersSheet
        isOpen={!!selectedRole}
        onClose={handleCloseSheet}
        role={selectedRole}
      />
    </div>
  );
}

const RoleCardSkeleton = () => (
  <>
    <div className="hidden lg:grid lg:grid-cols-[1.2fr_auto_1fr_auto_1fr] items-center py-4 gap-4">
      <div className="flex items-center gap-4">
        <Skeleton className="w-14 h-14 rounded-full" />
        <Skeleton className="h-8 w-40" />
      </div>
      <Separator orientation="vertical" className="h-14" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-36" />
      </div>
      <Separator orientation="vertical" className="h-14" />
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-14 w-40 rounded-full" />
      </div>
    </div>
    <div className="lg:hidden flex flex-col py-4 gap-4">
      <div className="flex items-center gap-4">
        <Skeleton className="w-14 h-14 rounded-full" />
        <Skeleton className="h-8 w-40" />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full rounded-full" />
      </div>
    </div>
    <Separator className="last:hidden" />
  </>
);
