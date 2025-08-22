import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, Star } from "lucide-react";

const vendors = [
    { id: 1, name: "BuildCo Supplies", service: "Raw Materials", rating: 4.9, contact: "john@buildco.com" },
    { id: 2, name: "HeavyLift Cranes", service: "Equipment Rental", rating: 4.5, contact: "sarah@heavylift.com" },
    { id: 3, "name": "Sparky Electricians", "service": "Electrical", "rating": 4.7, "contact": "mike@sparky.com" },
    { id: 4, "name": "PlumbPerfect", "service": "Plumbing", "rating": 4.2, "contact": "lisa@plumbperfect.com" },
    { id: 5, "name": "Glass & Mirror Inc.", "service": "Windows & Glazing", "rating": 4.8, "contact": "dave@glassinc.com" },
];

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => (
                <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">{rating.toFixed(1)}</span>
        </div>
    );
};

export default function VendorsPage() {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight font-headline">Vendor Management</h2>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Vendor
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Vendor List</CardTitle>
                    <CardDescription>Manage your list of suppliers and contractors.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Vendor Name</TableHead>
                                <TableHead>Service Provided</TableHead>
                                <TableHead>Contact Email</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vendors.map((vendor) => (
                                <TableRow key={vendor.id}>
                                    <TableCell className="font-medium">{vendor.name}</TableCell>
                                    <TableCell>{vendor.service}</TableCell>
                                    <TableCell>{vendor.contact}</TableCell>
                                    <TableCell><StarRating rating={vendor.rating} /></TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                <DropdownMenuItem>Edit Vendor</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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
