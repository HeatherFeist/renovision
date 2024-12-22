import { AR } from '@nativescript/ar';

export class ARService {
  private ar: AR;

  constructor() {
    this.ar = new AR();
  }

  async startARSession(): Promise<void> {
    try {
      await this.ar.startARSession({
        planeDetection: true,
        imageTracking: true
      });
    } catch (error) {
      console.error('Failed to start AR session:', error);
      throw error;
    }
  }

  async placeObject(modelUrl: string, position: { x: number; y: number; z: number }): Promise<void> {
    try {
      await this.ar.addModel({
        name: 'furniture',
        source: modelUrl,
        position: position,
        scale: { x: 1, y: 1, z: 1 }
      });
    } catch (error) {
      console.error('Failed to place object:', error);
      throw error;
    }
  }

  stopARSession(): void {
    this.ar.stopARSession();
  }
}