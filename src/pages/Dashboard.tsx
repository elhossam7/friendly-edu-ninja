import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">0</p>
            <p className="text-muted-foreground">Total Students</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">0</p>
            <p className="text-muted-foreground">Active Classes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">0</p>
            <p className="text-muted-foreground">Total Teachers</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <button className="p-4 text-left hover:bg-accent rounded-lg">
              <h3 className="font-semibold">Add Student</h3>
              <p className="text-sm text-muted-foreground">Register a new student</p>
            </button>
            <button className="p-4 text-left hover:bg-accent rounded-lg">
              <h3 className="font-semibold">Create Class</h3>
              <p className="text-sm text-muted-foreground">Set up a new class</p>
            </button>
            <button className="p-4 text-left hover:bg-accent rounded-lg">
              <h3 className="font-semibold">Add Teacher</h3>
              <p className="text-sm text-muted-foreground">Register a new teacher</p>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
