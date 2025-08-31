
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Search, MoreVertical, Edit, Trash2, Save } from 'lucide-react';
import Image from 'next/image';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

const MaterialItem = ({ material, onEdit, onDelete }: { material: any, onEdit: (material: any) => void, onDelete: (id: string) => void }) => (
    <div className="flex items-center gap-4">
        <Image src={material.image} width={100} height={100} alt={material.name} className="rounded-[25px] border border-stone-300" data-ai-hint="product image"/>
        <div className="flex-1 space-y-1">
            <p className="font-semibold">{material.name}</p>
            <p className="text-sm text-muted-foreground line-clamp-3">{material.description}</p>
        </div>
        <p className="font-medium text-lg">{material.price}</p>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5 text-muted-foreground"/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onEdit(material)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" onClick={() => onDelete(material.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
);

const EditMaterialForm = ({ material, onSave, onCancel }: { material: any, onSave: (updatedMaterial: any) => void, onCancel: () => void }) => {
    const [editedMaterial, setEditedMaterial] = useState(material);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedMaterial((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(editedMaterial);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-[25px] my-4">
             <div className="flex items-center gap-4">
                <Image src={editedMaterial.image} width={100} height={100} alt={editedMaterial.name} className="rounded-[25px] border border-stone-300" data-ai-hint="product image"/>
                <div className="flex-1 space-y-2">
                    <div>
                        <Label htmlFor="name">Product Name</Label>
                        <Input id="name" name="name" value={editedMaterial.name} onChange={handleInputChange} className="rounded-full bg-background h-12" />
                    </div>
                     <div>
                        <Label htmlFor="price">Price</Label>
                        <Input id="price" name="price" value={editedMaterial.price} onChange={handleInputChange} className="rounded-full bg-background h-12" />
                    </div>
                </div>
            </div>
            <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" value={editedMaterial.description} onChange={handleInputChange} className="rounded-[20px] bg-background" />
            </div>
            <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={onCancel} className="rounded-full h-12 px-6">Cancel</Button>
                <Button type="submit" className="rounded-full h-12 px-6">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                </Button>
            </div>
        </form>
    );
};


export const VendorMaterialsCard = ({ materials, setMaterials, isEditing }: { materials: any[], setMaterials: Function, isEditing: boolean }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [editingMaterial, setEditingMaterial] = useState<any | null>(null);

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
        setEditingMaterial(material);
    };
    
    const handleSaveEdit = (updatedMaterial: any) => {
        setMaterials(materials.map(m => m.id === updatedMaterial.id ? updatedMaterial : m));
        setEditingMaterial(null);
    }

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
                     {editingMaterial && (
                        <EditMaterialForm 
                            material={editingMaterial} 
                            onSave={handleSaveEdit}
                            onCancel={() => setEditingMaterial(null)}
                        />
                    )}
                    {filteredMaterials.map((material, index) => (
                        <React.Fragment key={material.id}>
                           <MaterialItem material={material} onEdit={handleEdit} onDelete={handleDelete} />
                           {index < filteredMaterials.length - 1 && <Separator style={{ backgroundColor: '#c0c0c0', height: '0.5px' }} />}
                        </React.Fragment>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
