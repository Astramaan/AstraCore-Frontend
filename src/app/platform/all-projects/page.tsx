
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";

const projects = [
    { name: "Sky Tower Construction", organization: "MegaCorp", status: "In Progress", deadline: "2024-12-31" },
    { name: "Downtown Plaza Renovation", organization: "Innovate Inc.", status: "On Hold", deadline: "2025-06-30" },
    { name: "Sunrise Bridge", organization: "InfraBuild", status: "Completed", deadline: "2024-03-15" },
    { name: "Oceanview Residences", organization: "Luxury Homes", status: "In Progress", deadline: "2024-09-01" },
    { name: "Eco Park Development", organization: "GreenScape", status: "Not Started", deadline: "2025-01-20" },
];

export default function ProjectsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">All Projects</h2>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Project List</CardTitle>
                    <CardDescription>An overview of all projects across all organizations.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Project Name</TableHead>
                                <TableHead>Organization</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Deadline</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.map((project) => (
                                <TableRow key={project.name}>
                                    <TableCell className="font-medium">{project.name}</TableCell>
                                    <TableCell>{project.organization}</TableCell>
                                    <TableCell>
                                        <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'} className={project.status === 'Completed' ? "bg-green-500" : ""}>
                                            {project.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{project.deadline}</TableCell>
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
                                                <DropdownMenuItem>Monitor Project</DropdownMenuItem>
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
