import { Observable } from '@nativescript/core';

export class ProgressTrackerService extends Observable {
  private projectProgress: Map<string, ProjectProgress> = new Map();

  updateProgress(projectId: string, task: Task): void {
    let progress = this.projectProgress.get(projectId) || {
      projectId,
      tasks: [],
      completionPercentage: 0,
      lastUpdated: new Date()
    };

    progress.tasks.push(task);
    this.calculateCompletion(progress);
    this.projectProgress.set(projectId, progress);
  }

  private calculateCompletion(progress: ProjectProgress): void {
    const completedTasks = progress.tasks.filter(task => task.completed).length;
    progress.completionPercentage = (completedTasks / progress.tasks.length) * 100;
    progress.lastUpdated = new Date();
  }

  getProgress(projectId: string): ProjectProgress | undefined {
    return this.projectProgress.get(projectId);
  }
}

interface ProjectProgress {
  projectId: string;
  tasks: Task[];
  completionPercentage: number;
  lastUpdated: Date;
}

interface Task {
  id: string;
  name: string;
  completed: boolean;
  completedAt?: Date;
}