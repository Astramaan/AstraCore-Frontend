import GanttChartPlaceholder from "@/components/gantt-chart-placeholder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";

const projects = [
    { name: "Sky Tower Construction", manager: "Alice Johnson", status: "In Progress", progress: 45, deadline: "2024-12-31" },
    { name: "Downtown Plaza Renovation", manager: "Bob Williams", status: "On Hold", progress: 10, deadline: "2025-06-30" },
    { name: "Sunrise Bridge", manager: "Charlie Brown", status: "Completed", progress: 100, deadline: "2024-03-15" },
    { name: "Oceanview Residences", manager: "Diana Prince", status: "In Progress", progress: 70, deadline: "2024-09-01" },
    { name: "Eco Park Development", manager: "Ethan Hunt", status: "Not Started", progress: 0, deadline: "2025-01-20" },
];

export default function ProjectsPage() {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight font-headline">Projects</h2>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Project
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Project List</CardTitle>
                    <CardDescription>An overview of all company projects.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Project Name</TableHead>
                                <TableHead>Project Manager</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Deadline</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.map((project) => (
                                <TableRow key={project.name}>
                                    <TableCell className="font-medium">{project.name}</TableCell>
                                    <TableCell>{project.manager}</TableCell>
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
                                                <DropdownMenuItem>Edit Project</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <GanttChartPlaceholder projects={projects} />

        </div>
    )
}
