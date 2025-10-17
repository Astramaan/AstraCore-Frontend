import { SubscriptionChart } from "@/components/charts/subscription-chart";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { ChurnChart } from "@/components/charts/churn-chart";
import { ExitSurveyChart } from "@/components/charts/exit-survey-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { unstable_noStore as noStore } from "next/cache";

export default function PlatformDashboard() {
  noStore();
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Analytics</CardTitle>
            <CardDescription>
              A chart showing the number of subscriptions over time.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <SubscriptionChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>
              A chart showing the revenue over time.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <RevenueChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Subscription Churn</CardTitle>
            <CardDescription>
              A chart showing the number of users who have churned over time.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ChurnChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Exit Survey</CardTitle>
            <CardDescription>
              A chart showing the results of the exit survey.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ExitSurveyChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}