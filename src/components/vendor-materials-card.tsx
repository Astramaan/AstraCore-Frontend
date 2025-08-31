
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Search, MoreVertical, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

const MaterialItem = ({ material, isEditing, onEdit, onDelete }: { material: any, isEditing: boolean, onEdit: (material: any) => void, onDelete: (id: string) => void }) => (
    <div className="flex items-center gap-4 p-4">
        <Image src={material.image} width={100} height={100} alt={material.name} className="rounded-[25px] border border-stone-300" data-ai-hint="product image"/>
        <div className="flex-1 space-y-1">
            <p className="font-semibold">{material.name}</p>
            <p className="text-sm text-muted-foreground line-clamp-3">{material.description}</p>
        </div>
        <p className="font-medium text-lg">{material.price}</p>
        {isEditing ? (
            <div className="flex gap-2">
                 <Button variant="ghost" size="icon" onClick={() => onEdit(material)}><Edit className="w-5 h-5 text-muted-foreground"/></Button>
                 <Button variant="ghost" size="icon" onClick={() => onDelete(material.id)}><Trash2 className="w-5 h-5 text-destructive"/></Button>
            </div>
        ) : (
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5 text-muted-foreground"/></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => onEdit(material)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => onDelete(material.id)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )}
    </div>
);

export const VendorMaterialsCard = ({ materials, setMaterials, isEditing }: { materials: any[], setMaterials: Function, isEditing: boolean }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMaterials = useMemo(() => {
        if (!searchTerm) {
            return materials;
        }
        return materials.filter(material =>
            material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            material.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [materials, searchTerm]);
    
    const handleDelete = (id: string) => {
        setMaterials(materials.filter(m => m.id !== id));
    };

    const handleEdit = (material: any) => {
        // In a real app, this would open a modal/form to edit the material
        alert(`Editing ${material.name}`);
    };

    return (
        <Card className="rounded-[50px] p-10">
            <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg">Materials</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-300" />
                    <Input 
                        placeholder="Search materials" 
                        className="pl-12 h-[54px] rounded-full bg-background border-0"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {filteredMaterials.map((material, index) => (
                        <React.Fragment key={material.id}>
                           <MaterialItem material={material} isEditing={isEditing} onEdit={handleEdit} onDelete={handleDelete} />
                           {index < filteredMaterials.length - 1 && <Separator style={{ backgroundColor: '#c0c0c0', height: '0.5px' }} />}
                        </React.Fragment>
                    ))}
                </div>
                 {isEditing && (
                    <Button variant="outline" className="w-full rounded-full h-12">Add New Material</Button>
                 )}
            </CardContent>
        </Card>
    );
};
