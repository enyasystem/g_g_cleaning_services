"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { PlusCircle, Edit2, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Service {
  id: string
  name: string
  description: string
  price: string // e.g., "$50/hr" or "From $100"
}

const initialServices: Service[] = [
  { id: "1", name: "Residential Cleaning", description: "Standard home cleaning.", price: "$60/hr" },
  { id: "2", name: "Commercial Cleaning", description: "Office and business spaces.", price: "Quote" },
  { id: "3", name: "Deep Cleaning", description: "Intensive cleaning service.", price: "From $200" },
]

export default function ServicesManagement() {
  const [services, setServices] = useState<Service[]>(initialServices)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentService, setCurrentService] = useState<Service | null>(null)
  const [serviceName, setServiceName] = useState("")
  const [serviceDescription, setServiceDescription] = useState("")
  const [servicePrice, setServicePrice] = useState("")

  const openModalForEdit = (service: Service) => {
    setCurrentService(service)
    setServiceName(service.name)
    setServiceDescription(service.description)
    setServicePrice(service.price)
    setIsModalOpen(true)
  }

  const openModalForNew = () => {
    setCurrentService(null)
    setServiceName("")
    setServiceDescription("")
    setServicePrice("")
    setIsModalOpen(true)
  }

  const handleSaveService = () => {
    if (currentService) {
      // Edit existing
      setServices(
        services.map((s) =>
          s.id === currentService.id
            ? { ...s, name: serviceName, description: serviceDescription, price: servicePrice }
            : s,
        ),
      )
    } else {
      // Add new
      const newService: Service = {
        id: Date.now().toString(),
        name: serviceName,
        description: serviceDescription,
        price: servicePrice,
      }
      setServices([...services, newService])
    }
    setIsModalOpen(false)
  }

  const handleDeleteService = (id: string) => {
    setServices(services.filter((s) => s.id !== id))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Manage Services</CardTitle>
              <CardDescription>Add, edit, or remove cleaning and maintenance services offered.</CardDescription>
            </div>
            <Button size="sm" onClick={openModalForNew}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Service
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.length > 0 ? (
                services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{service.description}</TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => openModalForEdit(service)} className="mr-2">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteService(service.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-24">
                    No services defined yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentService ? "Edit Service" : "Add New Service"}</DialogTitle>
            <DialogDescription>
              {currentService ? "Update the details of this service." : "Fill in the details for the new service."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                value={servicePrice}
                onChange={(e) => setServicePrice(e.target.value)}
                placeholder="e.g., $50/hr or From $100"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSaveService}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
