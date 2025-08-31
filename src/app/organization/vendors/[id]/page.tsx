
import { VendorDetailsCard } from '@/components/vendor-details-card';
import { VendorAccountDetailsCard } from '@/components/vendor-account-details-card';
import { VendorMaterialsCard } from '@/components/vendor-materials-card';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import React from 'react';

const mockVendor = {
    id: "1",
    companyName: "Teju Pan Shop",
    phone: "1234567890",
    email: "tejushop@gmail.com",
    address: "43, Second Floor, Leela Palace Rd, behind The Leela Palace, HAL 2nd Stage, Kodihalli, Bengaluru, Karnataka 560008",
    logo: "https://placehold.co/150x150",
    cinCertificate: "Cin Certificate.pdf",
    gstCertificate: "GST Certificate.pdf",
    gstNumber: "1234567890",
    brochure: "Brochure.pdf",
    serviceableCities: ["Bengaluru", "Kalasipalya", "HSR Layout", "Banashankari", "Jayanagar"],
    availability: {
        days: ["M", "T", "W"],
        time: "11:00 am - 1:00 pm"
    },
    accountDetails: {
        bankName: "SBI Bank",
        accountHolder: "Teju Kumar",
        accountNumber: "999999999999999999999",
        ifscCode: "BA2024",
        upiId: "Teju@sbiokupi01"
    },
    materials: [
        { id: '1', name: 'Tata Steel', price: '₹30,000', description: 'Brand: TATA, Diameter: 32 mm & above, Single Piece Length: 12 meter, Grade: Fe 550SD, Material: Carbon Steel, Yield Strength (Min): 620 MPa', image: 'https://placehold.co/100x100' },
        { id: '2', name: 'Tata Steel', price: '₹30,000', description: 'Brand: TATA, Diameter: 32 mm & above, Single Piece Length: 12 meter, Grade: Fe 550SD, Material: Carbon Steel, Yield Strength (Min): 620 MPa', image: 'https://placehold.co/100x100' },
        { id: '3', name: 'Tata Steel', price: '₹30,000', description: 'Brand: TATA, Diameter: 32 mm & above, Single Piece Length: 12 meter, Grade: Fe 550SD, Material: Carbon Steel, Yield Strength (Min): 620 MPa', image: 'https://placehold.co/100x100' },
        { id: '4', name: 'Tata Steel', price: '₹30,000', description: 'Brand: TATA, Diameter: 32 mm & above, Single Piece Length: 12 meter, Grade: Fe 550SD, Material: Carbon Steel, Yield Strength (Min): 620 MPa', image: 'https://placehold.co/100x100' },
        { id: '5', name: 'Tata Steel', price: '₹30,000', description: 'Brand: TATA, Diameter: 32 mm & above, Single Piece Length: 12 meter, Grade: Fe 550SD, Material: Carbon Steel, Yield Strength (Min): 620 MPa', image: 'https://placehold.co/100x100' },
        { id: '6', name: 'Tata Steel', price: '₹30,000', description: 'Brand: TATA, Diameter: 32 mm & above, Single Piece Length: 12 meter, Grade: Fe 550SD, Material: Carbon Steel, Yield Strength (Min): 620 MPa', image: 'https://placehold.co/100x100' },
    ]
};

export default function VendorDetailsPage({ params }: { params: { id: string } }) {
    // In a real app, you would fetch vendor data based on params.id
    const vendor = mockVendor;

    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <h2 className="text-2xl font-medium">Vendor Details</h2>
                <Button className="h-14 px-6 rounded-full bg-primary/10 text-primary border border-primary hover:bg-primary/20 text-lg font-medium">
                    <Edit className="mr-2 h-5 w-5" />
                    Edit
                </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
                <VendorDetailsCard vendor={vendor} />
                <div className="space-y-6 lg:w-[564px]">
                    <VendorAccountDetailsCard details={vendor.accountDetails} />
                    <VendorMaterialsCard materials={vendor.materials} />
                </div>
            </div>
        </div>
    );
}
