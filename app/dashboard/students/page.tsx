"use client"

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

interface Student {
  id: number
  name: string
  email: string
  grade: string
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [newStudent, setNewStudent] = useState({ name: '', email: '', grade: '' })
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  useEffect(() => {
    fetchStudents()
  }, [])

  async function fetchStudents() {
    const { data, error } = await supabase.from('students').select('*')
    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch students",
        variant: "destructive",
      })
    } else {
      setStudents(data || [])
    }
  }

  async function addStudent(e: React.FormEvent) {
    e.preventDefault()
    const { data, error } = await supabase.from('students').insert([newStudent])
    if (error) {
      toast({
        title: "Error",
        description: "Failed to add student",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Student added successfully",
      })
      setNewStudent({ name: '', email: '', grade: '' })
      fetchStudents()
    }
  }

  async function deleteStudent(id: number) {
    const { error } = await supabase.from('students').delete().match({ id })
    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete student",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Student deleted successfully",
      })
      fetchStudents()
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Students</h1>
      
      <form onSubmit={addStudent} className="space-y-4">
        <Input
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={newStudent.email}
          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
          required
        />
        <Input
          placeholder="Grade"
          value={newStudent.grade}
          onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
          required
        />
        <Button type="submit">Add Student</Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.grade}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => deleteStudent(student.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}