
'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Phone } from "lucide-react";

const onboardingData = [
    {
        id: 1,
        companyName: "Golden ventures",
        plan: "Free Trail",
        statusText: "Follow-up Required",
        statusColor: "text-Red",
        completedStages: "1/6 Completed Stages",
        date: "20 Aug 2025",
        stages: [
            { name: "Account Setup", completed: true },
            { name: "Subscription Preview", completed: false, active: true, isRed: true },
            { name: "Walkthrough", completed: false, active: false },
            { name: "First Project", completed: false, active: false },
            { name: "Smart Nudges", completed: false, active: false },
        ]
    },
    {
        id: 2,
        companyName: "Golden ventures",
        plan: "Free Trail",
        statusText: "",
        statusColor: "",
        completedStages: "2/6 Completed Stages",
        date: "20 Aug 2025",
        stages: [
            { name: "Account Setup", completed: true },
            { name: "Subscription Preview", completed: true },
            { name: "Walkthrough", completed: false, active: true, isRed: false },
            { name: "First Project", completed: false, active: false },
            { name: "Smart Nudges", completed: false, active: false },
        ]
    },
        {
        id: 3,
        companyName: "Golden ventures",
        plan: "Free Trail",
        statusText: "",
        statusColor: "",
        completedStages: "2/6 Completed Stages",
        date: "20 Aug 2025",
        stages: [
            { name: "Account Setup", completed: true },
            { name: "Subscription Preview", completed: true },
            { name: "Walkthrough", completed: false, active: true, isRed: false },
            { name: "First Project", completed: false, active: false },
            { name: "Smart Nudges", completed: false, active: false },
        ]
    },
    {
        id: 4,
        companyName: "Golden ventures",
        plan: "Free Trail",
        statusText: "",
        statusColor: "",
        completedStages: "4/6 Completed Stages",
        date: "20 Aug 2025",
        stages: [
            { name: "Account Setup", completed: true },
            { name: "Subscription Preview", completed: true },
            { name: "Walkthrough", completed: true },
            { name: "First Project", completed: true },
            { name: "Smart Nudges", completed: false, active: true, isRed: false },
        ]
    }
];

const TrackingButton = ({ name, completed, active, isRed }: { name: string, completed: boolean, active?: boolean, isRed?: boolean }) => {
    return (
        <div className={`h-14 p-3.5 rounded-[50px] flex justify-center items-center gap-2 ${completed ? 'bg-green-600' : active ? (isRed ? 'bg-white outline outline-1 outline-offset-[-1px] outline-red-500' : 'bg-white outline outline-1 outline-offset-[-1px] outline-primary') : 'bg-white outline outline-1 outline-offset-[-1px] outline-stone-300'}`}>
            {completed && <Check className="w-6 h-6 text-white" />}
            <div className={`text-base font-medium ${completed ? 'text-white' : active ? (isRed ? 'text-red-500' : 'text-primary') : 'text-stone-500'}`}>{name}</div>
        </div>
    );
}

const OnboardingItem = ({ item }: { item: any }) => (
    <div className="self-stretch h-32 relative flex justify-center items-center gap-4">
        <div className="size- relative flex justify-start items-center gap-2.5">
            <div className="w-24 h-32 bg-gradient-to-b from-white to-emerald-200 rounded-bl-3xl" />
            <div className="left-[38px] top-[37px] absolute text-gray-500 text-4xl font-bold">{item.id}</div>
        </div>
        <div className="h-24 flex-col justify-center items-center gap-4 inline-flex">
            <div className="w-[1115px] justify-center items-start gap-2.5 inline-flex">
                <div className="flex justify-start items-center gap-2.5">
                    <div className="text-black text-lg font-semibold">{item.companyName}</div>
                    <div className="text-gray-500 text-lg font-medium">{item.plan}</div>
                </div>
                <div className="flex-1 self-stretch justify-end items-center gap-24 flex">
                    <div className="justify-start items-center gap-4 flex">
                        {item.statusText && <div className="text-right text-red-500 text-lg font-medium">{item.statusText}</div>}
                        <div className="text-right text-gray-500 text-lg font-semibold">{item.completedStages}</div>
                    </div>
                    <div className="text-center text-gray-500 text-lg font-medium">{item.date}</div>
                </div>
            </div>
            <div className="h-14 relative justify-center items-start gap-6 flex">
                <div className="w-[921px] h-[5px] left-0 top-[29px] absolute bg-gray-100 rounded-[5px]" />
                {item.stages.map((stage: any, index: number) => {
                    if(stage.completed) {
                        return <div key={index} className={`w-4 h-[5px] left-[${171 + index * 227}px] top-[29px] absolute bg-green-600 rounded-[5px]`} />
                    }
                    return null;
                })}

                <div className="justify-start items-center gap-3.5 flex">
                    {item.stages.map((stage: any) => (
                        <TrackingButton key={stage.name} name={stage.name} completed={stage.completed} active={stage.active} isRed={stage.isRed} />
                    ))}
                </div>
                <Button className="h-14 px-10 py-3.5 bg-gray-100 rounded-[50px] flex justify-center items-center gap-2">
                    <Phone className="w-6 h-6 text-gray-500" />
                    <div className="text-gray-500 text-lg font-medium">Contact</div>
                </Button>
            </div>
        </div>
    </div>
);

export default function OnboardingManagementPage() {
    return (
        <div className="p-4 md:p-8">
            <Card className="w-full rounded-[50px]">
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-3.5 rounded-[50px] outline outline-1 outline-offset-[-1px] outline-gray-300">
                           <svg width="24" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5 3.25C3.75736 3.25 2.75 4.25736 2.75 5.5C2.75 6.74264 3.75736 7.75 5 7.75C6.24264 7.75 7.25 6.74264 7.25 5.5C7.25 4.25736 6.24264 3.25 5 3.25ZM1.25 5.5C1.25 3.42893 2.92893 1.75 5 1.75C7.07107 1.75 8.75 3.42893 8.75 5.5C8.75 7.57107 7.07107 9.25 5 9.25C2.92893 9.25 1.25 7.57107 1.25 5.5ZM10.25 5.5C10.25 5.08579 10.5858 4.75 11 4.75H16.1319C18.8831 4.75 19.9294 8.343 17.6083 9.82007L7.19703 16.4454C6.14197 17.1168 6.91835 18.75 8.1689 18.75H11.4901L10.9697 18.5303C10.6768 18.2374 10.6768 17.7626 10.9697 17.4697C11.2626 17.1768 11.7374 17.1768 12.0303 17.4697L13.5303 18.9697C13.8232 19.2626 13.8232 19.7374 13.5303 20.0303L12.0303 21.5303C11.7374 21.8232 11.2626 21.8232 10.9697 21.5303C10.6768 21.2374 10.6768 20.7626 10.9697 20.4697L11.1893 20.25H7.86812C5.11688 20.25 4.07062 16.657 6.39172 15.1799L16.803 8.55458C17.858 7.88318 17.3824 6.25 16.1319 6.25H11C10.5858 6.25 10.25 5.91421 10.25 5.5ZM19 17.25C17.7574 17.25 16.75 18.2574 16.75 19.5C16.75 20.7426 17.7574 21.75 19 21.75C20.2426 21.75 21.25 20.7426 21.25 19.5C21.25 18.2574 20.2426 17.25 19 17.25ZM15.25 19.5C15.25 17.4289 16.9289 15.75 19 15.75C21.0711 15.75 22.75 17.4289 22.75 19.5C22.75 21.5711 21.0711 22.75 19 22.75C16.9289 22.75 15.25 21.5711 15.25 19.5Z" fill="black"/>
                           </svg>
                        </div>
                        <h2 className="text-2xl font-semibold">Onboard Tracking</h2>
                    </div>
                </div>

                <div className="flex flex-col">
                    {onboardingData.map(item => (
                        <div key={item.id} className="border-b border-gray-200 last:border-b-0">
                           <OnboardingItem item={item} />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
