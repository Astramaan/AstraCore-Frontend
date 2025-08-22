import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Briefcase, CheckCircle, Clock, FileWarning, Star, Users } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>Download Report</Button>
        </div>
      </div>

      {/* Role: Super Admin / Org Admin */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+10% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Vendor</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">BuildCo</div>
            <p className="text-xs text-muted-foreground">4.9 average rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Snags</CardTitle>
            <FileWarning className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+5 since yesterday</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Role: Manager / Employee */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Project Progress</CardTitle>
            <CardDescription>Overview of current project statuses.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
             <div className="space-y-6">
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Project Alpha</span>
                        <span className="text-sm text-muted-foreground">75%</span>
                    </div>
                    <Progress value={75} />
                </div>
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Sky Tower Construction</span>
                        <span className="text-sm text-muted-foreground">45%</span>
                    </div>
                    <Progress value={45} />
                </div>
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Downtown Renovation</span>
                        <span className="text-sm text-muted-foreground">90%</span>
                    </div>
                    <Progress value={90} />
                </div>
                 <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Bridge Repair</span>
                        <span className="text-sm text-muted-foreground">20%</span>
                    </div>
                    <Progress value={20} />
                </div>
            </div>
          </CardContent>
        </Card>

        {/* Role: Employee / Manager */}
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">My Tasks</CardTitle>
            <CardDescription>Your assigned tasks for this week.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Finalize blueprints</div>
                    <div className="text-sm text-muted-foreground">Project Alpha</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="destructive">Urgent</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Vendor material check</div>
                    <div className="text-sm text-muted-foreground">Sky Tower</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary">Medium</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Client meeting prep</div>
                    <div className="text-sm text-muted-foreground">Downtown Renovation</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge>Low</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
       {/* Role: Client */}
       <div className="grid gap-4">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Client Project Timeline</CardTitle>
                    <CardDescription>Real-time updates on your project: &quot;My Dream Home&quot;.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative pl-6">
                        <div className="absolute left-6 top-0 bottom-0 w-px bg-border"></div>
                        <div className="relative mb-8">
                            <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                            <div className="pl-6">
                                <p className="font-medium">Foundation Laid</p>
                                <p className="text-sm text-muted-foreground">July 20, 2024</p>
                                <p className="text-sm">The foundation has been successfully poured and cured. We are ready for framing.</p>
                            </div>
                        </div>
                        <div className="relative mb-8">
                             <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                            <div className="pl-6">
                                <p className="font-medium">Framing Complete</p>
                                <p className="text-sm text-muted-foreground">August 5, 2024</p>
                                <p className="text-sm">The structural frame is now complete. Electrical and plumbing work will begin next week.</p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-border animate-pulse"></div>
                            <div className="pl-6">
                                <p className="font-medium text-muted-foreground">Upcoming: Electrical & Plumbing</p>
                                <p className="text-sm text-muted-foreground">Est. August 12, 2024</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
