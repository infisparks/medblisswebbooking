"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { User, Users, Plus, Edit2, Trash2, Save, X } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  age: string
  gender: string
  address: string
  emergencyContact: string
}

interface FamilyMember {
  id: string
  name: string
  age: string
  gender: string
  phone: string
  relationship: string
}

export default function ProfileManagement() {
  const [profile, setProfile] = useState<UserProfile>({
    id: "1",
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
    emergencyContact: "",
  })

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([])
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editingMember, setEditingMember] = useState<string | null>(null)
  const [newMember, setNewMember] = useState<Omit<FamilyMember, "id">>({
    name: "",
    age: "",
    gender: "",
    phone: "",
    relationship: "",
  })
  const [showAddMember, setShowAddMember] = useState(false)

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile")
    const savedFamily = localStorage.getItem("familyMembers")

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
    if (savedFamily) {
      setFamilyMembers(JSON.parse(savedFamily))
    }
  }, [])

  // Save profile to localStorage
  const saveProfile = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile))
    setIsEditingProfile(false)
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    })
  }

  // Add new family member
  const addFamilyMember = () => {
    if (!newMember.name || !newMember.age || !newMember.gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const member: FamilyMember = {
      ...newMember,
      id: Date.now().toString(),
    }

    const updatedFamily = [...familyMembers, member]
    setFamilyMembers(updatedFamily)
    localStorage.setItem("familyMembers", JSON.stringify(updatedFamily))

    setNewMember({
      name: "",
      age: "",
      gender: "",
      phone: "",
      relationship: "",
    })
    setShowAddMember(false)

    toast({
      title: "Family Member Added",
      description: `${member.name} has been added to your family.`,
    })
  }

  // Update family member
  const updateFamilyMember = (id: string, updatedMember: Partial<FamilyMember>) => {
    const updatedFamily = familyMembers.map((member) => (member.id === id ? { ...member, ...updatedMember } : member))
    setFamilyMembers(updatedFamily)
    localStorage.setItem("familyMembers", JSON.stringify(updatedFamily))
    setEditingMember(null)

    toast({
      title: "Family Member Updated",
      description: "Family member details have been updated.",
    })
  }

  // Delete family member
  const deleteFamilyMember = (id: string) => {
    const updatedFamily = familyMembers.filter((member) => member.id !== id)
    setFamilyMembers(updatedFamily)
    localStorage.setItem("familyMembers", JSON.stringify(updatedFamily))

    toast({
      title: "Family Member Removed",
      description: "Family member has been removed from your profile.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">Manage your personal information and family details</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Personal Profile
            </TabsTrigger>
            <TabsTrigger value="family" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Family Members
            </TabsTrigger>
          </TabsList>

          {/* Personal Profile Tab */}
          <TabsContent value="profile">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-blue-100/50 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-primary">Personal Information</CardTitle>
                    <CardDescription>Update your personal details and contact information</CardDescription>
                  </div>
                  <Button
                    onClick={() => (isEditingProfile ? saveProfile() : setIsEditingProfile(true))}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isEditingProfile ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      disabled={!isEditingProfile}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      disabled={!isEditingProfile}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      disabled={!isEditingProfile}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      value={profile.age}
                      onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                      disabled={!isEditingProfile}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select
                      value={profile.gender}
                      onValueChange={(value) => setProfile({ ...profile, gender: value })}
                      disabled={!isEditingProfile}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency">Emergency Contact</Label>
                    <Input
                      id="emergency"
                      value={profile.emergencyContact}
                      onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                      disabled={!isEditingProfile}
                      className="bg-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    disabled={!isEditingProfile}
                    className="bg-white min-h-[100px]"
                    placeholder="Enter your complete address"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Family Members Tab */}
          <TabsContent value="family">
            <div className="space-y-6">
              {/* Add New Member Card */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-blue-100/50 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl text-primary">Family Members</CardTitle>
                      <CardDescription>Add and manage your family members for easy booking</CardDescription>
                    </div>
                    <Button onClick={() => setShowAddMember(!showAddMember)} className="bg-primary hover:bg-primary/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Member
                    </Button>
                  </div>
                </CardHeader>

                {showAddMember && (
                  <CardContent className="p-6 border-t bg-gray-50/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="newName">Name *</Label>
                        <Input
                          id="newName"
                          value={newMember.name}
                          onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                          className="bg-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newAge">Age *</Label>
                        <Input
                          id="newAge"
                          type="number"
                          value={newMember.age}
                          onChange={(e) => setNewMember({ ...newMember, age: e.target.value })}
                          className="bg-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newGender">Gender *</Label>
                        <Select
                          value={newMember.gender}
                          onValueChange={(value) => setNewMember({ ...newMember, gender: value })}
                        >
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPhone">Phone Number</Label>
                        <Input
                          id="newPhone"
                          value={newMember.phone}
                          onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                          className="bg-white"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="newRelationship">Relationship</Label>
                        <Select
                          value={newMember.relationship}
                          onValueChange={(value) => setNewMember({ ...newMember, relationship: value })}
                        >
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="spouse">Spouse</SelectItem>
                            <SelectItem value="child">Child</SelectItem>
                            <SelectItem value="parent">Parent</SelectItem>
                            <SelectItem value="sibling">Sibling</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={addFamilyMember} className="bg-primary hover:bg-primary/90">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Member
                      </Button>
                      <Button variant="outline" onClick={() => setShowAddMember(false)}>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Family Members List */}
              <div className="grid gap-4">
                {familyMembers.length === 0 ? (
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-8 text-center">
                      <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">No Family Members Added</h3>
                      <p className="text-gray-500 mb-4">
                        Add family members to book tests for multiple people at once.
                      </p>
                      <Button onClick={() => setShowAddMember(true)} className="bg-primary hover:bg-primary/90">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Family Member
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  familyMembers.map((member) => (
                    <Card key={member.id} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-6">
                        {editingMember === member.id ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Name</Label>
                              <Input
                                value={member.name}
                                onChange={(e) => updateFamilyMember(member.id, { name: e.target.value })}
                                className="bg-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Age</Label>
                              <Input
                                type="number"
                                value={member.age}
                                onChange={(e) => updateFamilyMember(member.id, { age: e.target.value })}
                                className="bg-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Gender</Label>
                              <Select
                                value={member.gender}
                                onValueChange={(value) => updateFamilyMember(member.id, { gender: value })}
                              >
                                <SelectTrigger className="bg-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Phone</Label>
                              <Input
                                value={member.phone}
                                onChange={(e) => updateFamilyMember(member.id, { phone: e.target.value })}
                                className="bg-white"
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <Label>Relationship</Label>
                              <Select
                                value={member.relationship}
                                onValueChange={(value) => updateFamilyMember(member.id, { relationship: value })}
                              >
                                <SelectTrigger className="bg-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="spouse">Spouse</SelectItem>
                                  <SelectItem value="child">Child</SelectItem>
                                  <SelectItem value="parent">Parent</SelectItem>
                                  <SelectItem value="sibling">Sibling</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex gap-2 md:col-span-2">
                              <Button onClick={() => setEditingMember(null)} className="bg-primary hover:bg-primary/90">
                                <Save className="w-4 h-4 mr-2" />
                                Save
                              </Button>
                              <Button variant="outline" onClick={() => setEditingMember(null)}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                {member.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{member.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <span>{member.age} years</span>
                                  <span>•</span>
                                  <span className="capitalize">{member.gender}</span>
                                  {member.relationship && (
                                    <>
                                      <span>•</span>
                                      <Badge variant="secondary" className="capitalize">
                                        {member.relationship}
                                      </Badge>
                                    </>
                                  )}
                                </div>
                                {member.phone && <p className="text-sm text-gray-600 mt-1">{member.phone}</p>}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => setEditingMember(member.id)}>
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteFamilyMember(member.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
