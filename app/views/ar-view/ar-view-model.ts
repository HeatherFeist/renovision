import { Observable } from '@nativescript/core';
import { ARService } from '../../services/ar.service';

export class ARViewModel extends Observable {
  private arService: ARService;

  constructor() {
    super();
    this.arService = new ARService();
  }

  async onScanRoom() {
    try {
      await this.arService.startARSession();
      // Handle room scanning logic
    } catch (error) {
      console.error('Failed to scan room:', error);
    }
  }

  async onAddFurniture() {
    try {
      // Example furniture model URL - replace with actual model
      const modelUrl = 'assets/models/chair.glb';
      await this.arService.placeObject(modelUrl, { x: 0, y: 0, z: -2 });
    } catch (error) {
      console.error('Failed to add furniture:', error);
    }
  }

  onSaveDesign() {
    // Save current AR scene state
    this.arService.stopARSession();
  }
}