'use client';
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { createSnag } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, UploadCloud } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const reportedSnags = [
    { id: 1, title: "Leaky faucet in master bathroom", project: "Oceanview Residences", status: "Reported", imageUrl: "https://placehold.co/600x400.png", dataAiHint: "leaky faucet" },
    { id: 2, title: "Cracked window pane, 2nd floor", project: "Sky Tower", status: "In Progress", imageUrl: "https://placehold.co/600x400.png", dataAiHint: "cracked window" },
    { id: 3, title: "Misaligned cabinet door in kitchen", project: "Oceanview Residences", status: "Resolved", imageUrl: "https://placehold.co/600x400.png", dataAiHint: "cabinet door" },
];


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending}>
      {pending ? "Submitting..." : "Report Snag"}
    </Button>
  );
}

export default function SnagsPage() {
    const [state, action] = useActionState(createSnag, undefined);
    const { toast } = useToast();

    useEffect(() => {
        if (state?.error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: state.error,
            });
        }
        if (state?.success) {
            toast({
                title: "Success",
                description: state.success,
            });
        }
    }, [state, toast]);

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight font-headline">Snag List</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <form action={action}>
                        <CardHeader>
                            <CardTitle>Report a New Defect/Issue</CardTitle>
                            <CardDescription>Found something wrong? Let us know here.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Snag Title</Label>
                                <Input id="title" name="title" placeholder="e.g., Leaky faucet in kitchen" required/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" name="description" placeholder="Provide more details about the issue." required/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="photo">Upload Photo</Label>
                                <div className="flex items-center justify-center w-full">
                                    <Label htmlFor="photo" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <Input id="photo" name="photo" type="file" className="hidden" />
                                    </Label>
                                </div> 
                            </div>
                        </CardContent>
                        <CardFooter>
                            <SubmitButton />
                        </CardFooter>
                    </form>
                </Card>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold font-headline">Reported Snags</h3>
                    {reportedSnags.map(snag => (
                        <Card key={snag.id}>
                            <CardContent className="p-4 flex gap-4">
                               <Image src={snag.imageUrl} alt={snag.title} width={150} height={100} className="rounded-md object-cover" data-ai-hint={snag.dataAiHint} />
                               <div className="space-y-1">
                                    <div className="flex justify-between items-start">
                                        <p className="font-semibold">{snag.title}</p>
                                        <Badge variant={snag.status === 'Resolved' ? "default" : 'secondary'} className={snag.status === "Resolved" ? "bg-green-500" : ""}>
                                            {snag.status}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{snag.project}</p>
                               </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
