

'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, ArrowRight, Users, HandCoins, UserMinus, FileText, MessagesSquare, Milestone, Plus, Settings, Building2, GanttChartSquare, Bell, TrendingUp, TrendingDown } from 'lucide-react';
import { RevenueChart } from '@/components/charts/revenue-chart';
import { SubscriptionChart } from '@/components/charts/subscription-chart';
import { ChurnChart } from '@/components/charts/churn-chart';
import { ExitSurveyChart } from '@/components/charts/exit-survey-chart';
import Link from 'next/link';
import { InviteUserSheet } from '@/components/invite-user-sheet';
import NotificationBellIcon from '@/components/icons/notification-bell-icon';
import { HabiLogo } from '@/components/habi-logo';

const FilterToggle = () => {
  const [active, setActive] = React.useState('Month');
  return (
    <div className="relative bg-white rounded-[50px] p-1 flex w-48 text-lg">
      <div 
        className="absolute top-1 bottom-1 bg-primary transition-all duration-300 rounded-[50px]"
        style={{
          width: 'calc(50% - 4px)',
          left: active === 'Month' ? '4px' : 'calc(50% + 2px)',
        }}
      />
      <button 
        onClick={() => setActive('Month')}
        className={`relative z-10 w-1/2 py-2.5 text-center transition-colors duration-300 rounded-full ${active === 'Month' ? 'text-white' : 'text-black'}`}
      >
        Month
      </button>
      <button 
        onClick={() => setActive('Year')}
        className={`relative z-10 w-1/2 py-2.5 text-center transition-colors duration-300 rounded-full ${active === 'Year' ? 'text-white' : 'text-black'}`}
      >
        Year
      </button>
    </div>
  );
};


const ActiveCustomers = () => {
    return (
        <div className="flex items-center gap-4">
            <div className="flex -space-x-4">
                {[...Array(3)].map((_, i) => (
                    <Avatar key={i} className="border-4 border-white h-12 w-12">
                        <AvatarImage src={`https://i.pravatar.cc/50?img=${i+1}`} data-ai-hint="person portrait" />
                        <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                ))}
                <Avatar className="border-4 border-white bg-primary text-primary-foreground h-12 w-12">
                    <AvatarFallback>+6</AvatarFallback>
                </Avatar>
            </div>
            <Button variant="ghost" size="icon" className="bg-white rounded-full h-14 w-14 hover:bg-primary hover:text-white">
                <ArrowRight />
            </Button>
            <InviteUserSheet />
        </div>
    )
}

const QuickLinkCard = ({icon, label, color}: {icon: React.ReactNode, label: string, color: string}) => (
    <div className="bg-background rounded-2xl p-4 flex items-center gap-2">
        <div className={`p-2.5 rounded-full`} style={{backgroundColor: color}}>
            {icon}
        </div>
        <p className="font-medium text-base">{label}</p>
    </div>
);


export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
        <header className="flex justify-between items-center mb-8">
            <div className="flex justify-start items-center gap-4">
                <HabiLogo className="w-32 h-12"/>
                 <div className="w-px h-12 bg-stone-300/0"></div>
                <h1 className="text-black text-4xl font-bold">Dashboard</h1>
            </div>
             <div className="flex justify-end items-center gap-6">
                <Button variant="ghost" size="icon" className="p-3.5 bg-white rounded-[50px]">
                    <Bell className="relative"/>
                </Button>
                <div className="w-px h-12 bg-stone-300/0"></div>
                 <div className="flex justify-start items-center gap-2">
                    <Avatar className="h-14 w-14">
                        <AvatarImage src="https://i.pravatar.cc/55" alt="Balaji Naik"/>
                        <AvatarFallback>BN</AvatarFallback>
                    </Avatar>
                    <div className="inline-flex flex-col justify-start items-start gap-1">
                        <p className="text-black text-lg font-medium">Balaji Naik</p>
                        <p className="text-grey-2 text-base font-medium">Super Admin</p>
                    </div>
                </div>
            </div>
        </header>

      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 w-full">
          <div className="space-y-2 w-full md:w-auto">
            <p className="text-base font-medium">Filter</p>
            <FilterToggle />
          </div>
          <div className="space-y-2 w-full md:w-auto">
            <p className="text-base font-medium">Select Month</p>
            <Button variant="outline" className="h-14 bg-white rounded-full px-10 text-lg font-medium w-full justify-center hover:bg-primary hover:text-white">
              <Calendar className="mr-2 h-6 w-6" />
              April 2025
            </Button>
          </div>
        </div>
        <div className="space-y-2 w-full md:w-auto">
            <p className="text-lg font-medium">Active Customers</p>
            <ActiveCustomers />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="rounded-[50px]">
              <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1">
                          <TrendingUp className="h-6 w-6" />
                      </div>
                      <div>
                          <CardTitle className="font-semibold text-xl md:text-2xl">Subscriptions Analytics</CardTitle>
                          <CardDescription className="font-medium">Monthly active Subscriptions</CardDescription>
                      </div>
                    </div>
                    <p className="text-2xl md:text-4xl font-bold">200 <span className="text-green-500 text-xl md:text-2xl">↑</span></p>
                  </div>
              </CardHeader>
              <CardContent>
                  <div className="h-[250px] w-full">
                      <SubscriptionChart />
                  </div>
              </CardContent>
          </Card>
           <Card className="rounded-[50px]">
              <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1">
                          <HandCoins className="h-6 w-6" />
                      </div>
                      <div>
                          <CardTitle className="font-semibold text-xl md:text-2xl">Revenue (MRR/ARR)</CardTitle>
                          <CardDescription className="font-medium">Monthly Recurring Revenue</CardDescription>
                      </div>
                    </div>
                    <p className="text-2xl md:text-4xl font-bold">1.90L <span className="text-green-500 text-xl md:text-2xl">↑</span></p>
                  </div>
              </CardHeader>
              <CardContent>
                  <div className="h-[250px] w-full">
                     <RevenueChart />
                  </div>
              </CardContent>
          </Card>
           <Card className="rounded-[50px]">
              <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1">
                          <TrendingDown className="h-6 w-6"/>
                      </div>
                      <div>
                          <CardTitle className="font-semibold text-xl md:text-2xl">Subscriptions Churn</CardTitle>
                          <CardDescription className="font-medium">Unsubscribed Users</CardDescription>
                      </div>
                    </div>
                     <p className="text-2xl md:text-4xl font-bold">69 <span className="text-red-500 text-xl md:text-2xl">↓</span></p>
                  </div>
              </CardHeader>
              <CardContent>
                  <div className="h-[250px] w-full">
                      <ChurnChart />
                  </div>
              </CardContent>
          </Card>
           <Card className="rounded-[50px]">
              <CardHeader>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1">
                          <Milestone className="h-6 w-6" />
                      </div>
                      <div>
                          <CardTitle className="font-semibold text-xl md:text-2xl">Quick Links</CardTitle>
                      </div>
                    </div>
                  </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <QuickLinkCard icon={<Users className="h-6 w-6" />} label="Lead Management" color="hsl(var(--accent-color-01))" />
                  <QuickLinkCard icon={<HandCoins className="h-6 w-6" />} label="Payment Attempts" color="hsl(var(--accent-color-02))" />
                  <QuickLinkCard icon={<Users className="h-6 w-6" />} label="Onboarding Status" color="hsl(var(--accent-color-03))" />
                  <QuickLinkCard icon={<MessagesSquare className="h-6 w-6" />} label="Invitation Status" color="hsl(var(--accent-color-05))" />
              </CardContent>
          </Card>
      </div>

       <Card className="rounded-[50px]">
            <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="p-3.5 rounded-full outline outline-1 outline-offset-[-1px] outline-grey-1">
                            <FileText className="h-6 w-6" />
                        </div>
                        <CardTitle className="font-semibold text-xl md:text-2xl">Exit Survey</CardTitle>
                    </div>
                    <div className="flex items-center gap-4 self-end md:self-center">
                        <p className="text-base md:text-lg font-medium">Total Response: <span className="text-2xl md:text-4xl font-bold">129</span></p>
                        <Button variant="ghost" size="icon" className="bg-background rounded-full hover:bg-primary hover:text-white">
                            <ArrowRight />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                    <div className="h-[250px] w-full max-w-sm mx-auto">
                        <ExitSurveyChart />
                    </div>
                    <div className="space-y-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                            <div className="flex items-center gap-2">
                                <Avatar><AvatarImage src="https://i.pravatar.cc/40?img=4" data-ai-hint="company logo" /><AvatarFallback>BB</AvatarFallback></Avatar>
                                <div>
                                    <p className="font-medium">Brick & Bolt</p>
                                    <p className="text-sm text-muted-foreground">Pricing too high</p>
                                </div>
                            </div>
                            <Button variant="outline" className="rounded-full w-full md:w-auto hover:bg-primary hover:text-white">Contact</Button>
                        </div>
                         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                            <div className="flex items-center gap-2">
                                <Avatar><AvatarImage src="https://i.pravatar.cc/40?img=5" data-ai-hint="company logo" /><AvatarFallback>PP</AvatarFallback></Avatar>
                                <div>
                                    <p className="font-medium">Powerplay</p>
                                    <p className="text-sm text-muted-foreground">Missing Features</p>
                                </div>
                            </div>
                            <Button variant="outline" className="rounded-full w-full md:w-auto hover:bg-primary hover:text-white">Contact</Button>
                        </div>
                         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                            <div className="flex items-center gap-2">
                                <Avatar><AvatarImage src="https://i.pravatar.cc/40?img=6" data-ai-hint="person portrait" /><AvatarFallback>HM</AvatarFallback></Avatar>
                                <div>
                                    <p className="font-medium">Harish mane</p>
                                    <p className="text-sm text-muted-foreground">Technical issues</p>
                                </div>
                            </div>
                            <Button variant="outline" className="rounded-full w-full md:w-auto hover:bg-primary hover:text-white">Contact</Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
