"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Card, CardHeader, CardTitle, CardContent, Input } from "@/components/ui";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [newProjectName, setNewProjectName] = useState("");

    useEffect(() => {
        // Fetch projects
        // fetch('/api/projects?workspaceId=...')
        // Mock data
        setProjects([
            { id: "1", name: "Summer Campaign", updated_at: new Date().toISOString() },
            { id: "2", name: "Black Friday", updated_at: new Date().toISOString() },
        ]);
    }, []);

    const handleCreateProject = async () => {
        // Call API to create project
        const newProject = { id: Date.now().toString(), name: newProjectName, updated_at: new Date().toISOString() };
        setProjects([newProject, ...projects]);
        setNewProjectName("");
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
                <div className="flex gap-2">
                    <Input
                        placeholder="New Project Name"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                        className="w-64"
                    />
                    <Button onClick={handleCreateProject}>Create Project</Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Link href={`/projects/${project.id}`} key={project.id}>
                        <Card className="hover:bg-slate-50 transition-colors cursor-pointer">
                            <CardHeader>
                                <CardTitle>{project.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{project.description}</p>
                                <div className="mt-4 flex justify-end">
                                    <Button variant="ghost" size="sm">View Content &rarr;</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
