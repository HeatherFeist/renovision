import { Observable, ImageSource } from '@nativescript/core';
import { Camera } from '@nativescript/camera';

export class PhotoGalleryService extends Observable {
  private photos: Map<string, ProjectPhoto[]> = new Map();
  private camera: Camera;

  constructor() {
    super();
    this.camera = new Camera();
  }

  async capturePhoto(projectId: string, type: PhotoType): Promise<void> {
    try {
      const image = await this.camera.takePicture({
        width: 1920,
        height: 1080,
        keepAspectRatio: true,
        saveToGallery: true
      });

      const projectPhotos = this.photos.get(projectId) || [];
      projectPhotos.push({
        id: Date.now().toString(),
        projectId,
        type,
        imageSource: image,
        timestamp: new Date()
      });

      this.photos.set(projectId, projectPhotos);
    } catch (error) {
      console.error('Failed to capture photo:', error);
      throw error;
    }
  }

  getProjectPhotos(projectId: string, type?: PhotoType): ProjectPhoto[] {
    const photos = this.photos.get(projectId) || [];
    return type ? photos.filter(photo => photo.type === type) : photos;
  }
}

interface ProjectPhoto {
  id: string;
  projectId: string;
  type: PhotoType;
  imageSource: ImageSource;
  timestamp: Date;
}

enum PhotoType {
  BEFORE = 'before',
  PROGRESS = 'progress',
  AFTER = 'after'
}