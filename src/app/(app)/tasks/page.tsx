import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";

const tasks = [
    { id: 1, name: "Draft initial architectural plans", project: "Sky Tower", assignee: "Alice", priority: "High", due: "2024-08-15", completed: false },
    { id: 2, name: "Procure steel beams", project: "Sky Tower", assignee: "Bob", priority: "High", due: "2024-08-20", completed: false },
    { id: 3, name: "Review and approve plumbing layout", project: "Oceanview Residences", assignee: "Charlie", priority: "Medium", due: "2024-08-18", completed: true },
    { id: 4, name: "Client design consultation", project: "Downtown Plaza", assignee: "Alice", priority: "Low", due: "2024-09-01", completed: false },
    { id: 5, name: "Submit environmental impact report", project: "Eco Park", assignee: "Diana", priority: "High", due: "2024-08-10", completed: true },
    { id: 6, name: "Safety inspection of scaffolding", project: "Sky Tower", assignee: "Ethan", priority: "Medium", due: "2024-08-22", completed: false },
];

const priorityVariant: {[key: string]: "destructive" | "secondary" | "default"} = {
    "High": "destructive",
    "Medium": "secondary",
    "Low": "default"
}

export default function TasksPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight font-headline">Task Management</h2>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Task
            </Button>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>All Tasks</CardTitle>
                <CardDescription>Manage and track all tasks across projects.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]"><span className="sr-only">Completed</span></TableHead>
                            <TableHead>Task</TableHead>
                            <TableHead>Project</TableHead>
                            <TableHead>Assignee</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.id} className={task.completed ? 'text-muted-foreground' : ''}>
                                <TableCell>
                                    <Checkbox checked={task.completed} aria-label={`Mark task ${task.id} as completed`} />
                                </TableCell>
                                <TableCell className={`font-medium ${task.completed ? 'line-through' : ''}`}>{task.name}</TableCell>
                                <TableCell>{task.project}</TableCell>
                                <TableCell>
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={`https://placehold.co/100x100.png?text=${task.assignee.charAt(0)}`} data-ai-hint="person portrait" />
                                        <AvatarFallback>{task.assignee.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={priorityVariant[task.priority]}>{task.priority}</Badge>
                                </TableCell>
                                <TableCell>{task.due}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View Sub-tasks</DropdownMenuItem>
                                            <DropdownMenuItem>Set Reminder</DropdownMenuItem>
                                            <DropdownMenuItem>Edit Task</DropdownMenuItem>
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
  );
}
