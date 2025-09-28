
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AssignTaskSheet } from "@/components/add-task-sheet";
import { AddMemberSheet } from "@/components/add-member-sheet";
import RedirectionArrowIcon from '@/components/icons/redirection-arrow-icon';
import { TaskOverviewChart } from '@/components/charts/task-overview-chart';
import type { Meeting } from '@/components/meeting-details-sheet';
import type { Task } from '@/components/task-details-sheet';
import GoogleMeetIcon from './icons/google-meet-icon';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useUser } from '@/context/user-context';

const MeetingCard = ({ meeting, onClick }: { meeting: Meeting, onClick: (meeting: Meeting) => void }) => (
    <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.2 }}
        onClick={() => onClick(meeting)}
        className="cursor-pointer hover:shadow-lg rounded-[50px]"
    >
        <Card className="w-full h-20 rounded-[50px] py-4 px-6 md:px-10 flex items-center justify-between">
            <div className="flex-1">
                <p className="text-base font-medium">{meeting.name}</p>
                <p className="text-xs text-muted-foreground">{meeting.type === 'lead' ? 'LEAD' : 'CLIENT'} ID: {meeting.id}</p>
            </div>
            <div className="text-right">
                <p className="text-sm font-medium">{meeting.time}</p>
                <p className="text-sm text-muted-foreground">{meeting.date}</p>
            </div>
            <div className="flex flex-col items-center gap-1 pl-4">
                <RedirectionArrowIcon className="w-5 h-5 text-muted-foreground" />
                <GoogleMeetIcon className="w-5 h-5" />
            </div>
        </Card>
    </motion.div>
)

interface HomeAsideProps {
    meetings?: Meeting[];
    myTasksChartData?: { name: string; value: number }[];
    assignedTasksChartData?: { name: string; value: number }[];
    projectTasksChartData?: { name: string; value: number, fill: string }[];
    onMeetingClick?: (meeting: Meeting) => void;
    onAddTask?: (task: Omit<Task, 'id' | 'attachments'>) => void;
    showAddMemberButton?: boolean;
}

export function HomeAside({ meetings, myTasksChartData, assignedTasksChartData, projectTasksChartData, onMeetingClick, onAddTask, showAddMemberButton = false }: HomeAsideProps) {
    const params = useParams();
    const organizationId = params.organizationId as string;
    const { user } = useUser();
    
    const canAddMember = user?.roleType === 'superAdmin' || user?.team === 'Project Manager';
    const canAssignTask = onAddTask && (user?.roleType === 'superAdmin');

    return (
        <aside className="w-full lg:w-[420px] space-y-6 flex-shrink-0">
            {canAssignTask && (
                <div className="hidden lg:flex flex-wrap lg:flex-nowrap justify-end items-center gap-4">
                    <AssignTaskSheet onTaskAssigned={onAddTask} />
                    {showAddMemberButton && canAddMember && <AddMemberSheet />}
                </div>
            )}

            <div className="md:grid md:grid-cols-2 lg:grid-cols-1 gap-6">
                 {meetings && meetings.length > 0 && onMeetingClick && (
                     <div>
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-xl font-medium">Meetings</h2>
                            <Link href={`/organization/${organizationId}/meetings`} className="text-sm text-black hover:text-primary">
                                see all meetings
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {meetings.map(meeting => <MeetingCard key={meeting.id} meeting={meeting} onClick={onMeetingClick} />)}
                        </div>
                    </div>
                 )}
                
                 <div>
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-xl font-medium">Overview</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
                        {projectTasksChartData && (
                             <Card className="rounded-[50px] relative">
                                <CardContent className="pt-10">
                                    <div className="relative">
                                        <TaskOverviewChart data={projectTasksChartData} title="Project Tasks" />
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                        {myTasksChartData && myTasksChartData.length > 0 && 
                            <Card className="rounded-[50px] relative">
                                <CardContent className="pt-10">
                                    <div className="relative">
                                        <TaskOverviewChart data={myTasksChartData} title="My Tasks" />
                                    </div>
                                </CardContent>
                            </Card>
                        }

                        {assignedTasksChartData && assignedTasksChartData.length > 0 &&
                            <Card className="rounded-[50px] relative">
                                <CardContent className="pt-10">
                                    <div className="relative">
                                        <TaskOverviewChart data={assignedTasksChartData} title={<>Assigned<br />Tasks</>} />
                                    </div>
                                </CardContent>
                            </Card>
                        }
                    </div>
                </div>
            </div>
        </aside>
    );
}
