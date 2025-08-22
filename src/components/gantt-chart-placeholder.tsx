import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Project = {
    name: string;
    progress: number;
    status: string;
}

interface GanttChartPlaceholderProps {
    projects: Project[];
}

const GanttChartPlaceholder = ({ projects }: GanttChartPlaceholderProps) => {
    const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Project Timeline (Gantt View)</CardTitle>
                <CardDescription>Visual timeline of project stages and milestones.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="grid grid-cols-12 gap-2 text-center text-sm font-medium text-muted-foreground">
                        <div className="col-span-2"></div>
                        {months.map(month => (
                             <div key={month} className="col-span-1">{month}</div>
                        ))}
                        <div className="col-span-2"></div>
                    </div>
                     <div className="relative border-t border-b border-border py-4">
                        <div className="grid grid-cols-12 gap-2 absolute inset-0 -z-10">
                            <div className="col-span-2"></div>
                             {months.map((_, index) => (
                                 <div key={index} className="col-span-1 h-full border-l border-border"></div>
                             ))}
                        </div>
                        <div className="space-y-3">
                            {projects.filter(p => p.status !== "Not Started").map((project, index) => (
                                <div key={project.name} className="grid grid-cols-12 gap-2 items-center text-sm">
                                    <div className="col-span-2 truncate pr-2 font-medium">{project.name}</div>
                                    <div className={`col-span-10 h-6 rounded-md bg-primary/20`}>
                                        <div 
                                            className="h-full rounded-md bg-primary text-primary-foreground flex items-center justify-center text-xs"
                                            style={{ 
                                                width: `${project.progress}%`,
                                                marginLeft: `${index * 5}%` // Mock start date
                                            }}
                                        >
                                            {project.progress > 10 && `${project.progress}%`}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default GanttChartPlaceholder;
