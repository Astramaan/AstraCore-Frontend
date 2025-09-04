
'use client';

import { ArrowRight, Briefcase, Code, Palette, Plus, Shield, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const roles = [
    { name: "Super Admin", icon: <Shield className="w-6 h-6 text-black" />, bgColor: "bg-red-200/30" },
    { name: "Sales", icon: <Briefcase className="w-6 h-6 text-black" />, bgColor: "bg-yellow-400/30" },
    { name: "Software Development", icon: <Code className="w-6 h-6 text-black" />, bgColor: "bg-blue-300/30" },
    { name: "Design", icon: <Palette className="w-6 h-6 text-black" />, bgColor: "bg-purple-300/30" },
    { name: "Support & Feedback", icon: <Users className="w-6 h-6 text-black" />, bgColor: "bg-green-300/30" },
    { name: "Human Resources", icon: <Users className="w-6 h-6 text-black" />, bgColor: "bg-pink-300/30" },
];

export const RoleAccessCard = () => {
    return (
        <Card className="rounded-[50px] h-full">
            <CardHeader className="flex flex-row justify-between items-center p-6">
                <div className="flex items-center gap-2">
                    <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1">
                        <Users className="h-6 w-6"/>
                    </div>
                    <CardTitle className="text-2xl font-semibold">Role Access</CardTitle>
                </div>
                <Button variant="outline" className="h-14 px-10 rounded-full text-lg bg-background hover:bg-muted">
                    <Plus className="mr-2 h-6 w-6"/>
                    Add Role
                </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 px-6 pb-6">
                {roles.map(role => (
                    <div key={role.name} className="flex justify-between items-center pb-4 border-b">
                         <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${role.bgColor}`}>
                                {role.icon}
                            </div>
                            <p className="text-lg font-medium">{role.name}</p>
                        </div>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
