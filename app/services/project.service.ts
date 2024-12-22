import { Observable } from '@nativescript/core';
import { Project, Material } from '../models/project.model';

export class ProjectService extends Observable {
  private projects: Project[] = [];

  createProject(project: Partial<Project>): Project {
    const newProject: Project = {
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      materials: [],
      scans: [],
      ...project
    };
    
    this.projects.push(newProject);
    this.notifyPropertyChange('projects', this.projects);
    return newProject;
  }

  calculateProjectCost(projectId: string): number {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) return 0;

    return project.materials.reduce((total, material) => {
      return total + (material.price * material.quantity);
    }, 0);
  }

  addMaterial(projectId: string, material: Material): void {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) return;

    project.materials.push(material);
    project.updatedAt = new Date();
    this.notifyPropertyChange('projects', this.projects);
  }
}