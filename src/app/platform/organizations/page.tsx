
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";

const organizations = [
    { id: 1, name: "MegaCorp Construction", plan: "Enterprise", status: "Active", users: 150, projects: 25 },
    { id: 2, name: "Innovate Inc.", plan: "Business", status: "Active", users: 50, projects: 10 },
    { id: 3, name: "InfraBuild Co.", plan: "Enterprise", status: "Active", users: 250, projects: 40 },
    { id: 4, name: "Luxury Homes LLC", plan: "Business", status: "Trial", users: 15, projects: 3 },
    { id: 5, name: "GreenScape Solutions", plan: "Starter", status: "Inactive", users: 5, projects: 1 },
];

export default function OrganizationsPage() {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Organizations</h2>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Invite Organization
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Organization List</CardTitle>
                    <CardDescription>Manage all onboarded organizations.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Organization Name</TableHead>
                                <TableHead>Subscription Plan</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Users</TableHead>
                                <TableHead>Projects</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {organizations.map((org) => (
                                <TableRow key={org.id}>
                                    <TableCell className="font-medium">{org.name}</TableCell>
                                    <TableCell>{org.plan}</TableCell>
                                    <TableCell>
                                        <Badge variant={org.status === 'Active' ? 'default' : org.status === 'Trial' ? 'secondary' : 'destructive'}>
                                            {org.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{org.users}</TableCell>
                                    <TableCell>{org.projects}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                <DropdownMenuItem>Manage Subscription</DropdownMenuItem>
                                                <DropdownMenuItem>Suspend Organization</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
