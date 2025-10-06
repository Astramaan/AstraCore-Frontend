
'use client';

import { Card } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import type { Task } from '@/components/task-details-sheet';
import { motion } from 'framer-motion';

const getDateColor = (dateString: string) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return 'text-red-500'; // Today
    } else if (diffDays === 1) {
        return 'text-orange-500'; // Tomorrow
    } else {
        return 'text-muted-foreground'; // Default
    }
};

export const TaskCard = ({ task, onClick }: { task: Task, onClick: () => void }) => {
    const priorityColors: { [key: string]: string } = {
        "Low": "bg-cyan-500/10 text-cyan-500",
        "Medium": "bg-yellow-500/10 text-yellow-500",
        "High": "bg-red-500/10 text-red-500",
    }
    
    const statusColors: { [key: string]: string } = {
        "In Progress": "bg-blue-100 text-blue-800",
        "Pending": "bg-yellow-100 text-yellow-800",
    }

    const formattedDate = new Date(task.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }).replace(/ /g, ' ');
    const dateColor = getDateColor(task.date);

    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.2 }}
        >
            <Card className="w-full h-44 rounded-[40px] flex flex-col justify-between p-6 cursor-pointer hover:shadow-lg transition-shadow bg-card" onClick={onClick}>
                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="text-lg font-medium text-card-foreground line-clamp-1">{task.title}</h3>
                        <div className="flex-shrink-0 flex gap-2">
                            <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                        </div>
                    </div>
                    <p className="text-base text-card-foreground mt-2 truncate flex-grow">{task.description}</p>
                    {task.status && (task.status === "In Progress" || task.status === "Pending") && (
                        <div className="mt-2 flex justify-end">
                            <Badge className={cn(statusColors[task.status])}>{task.status}</Badge>
                        </div>
                    )}
                </div>
                <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center">
                        <div className="flex -space-x-2">
                            <Avatar className="w-6 h-6 border-2 border-white"><AvatarImage src="https://picsum.photos/seed/avatar1/25/25" data-ai-hint="person portrait" /></Avatar>
                            <Avatar className="w-6 h-6 border-2 border-white"><AvatarImage src="https://picsum.photos/seed/avatar2/25/25" data-ai-hint="person portrait" /></Avatar>
                        </div>
                         <Badge variant="outline" className="ml-4 bg-zinc-100 border-zinc-100 text-zinc-900">{task.category}</Badge>
                    </div>
                    <div className="text-right flex items-center gap-2">
                         <p className={cn("text-sm font-medium", dateColor)}>Due: {formattedDate}</p>
                    </div>
                </div>
            </Card>
        </motion.div>
    )
};
