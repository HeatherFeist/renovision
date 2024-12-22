import { Observable } from '@nativescript/core';
import { ARService } from './ar.service';

export class FurniturePreviewService extends Observable {
  private arService: ARService;
  private placedFurniture: Map<string, PlacedFurniture> = new Map();

  constructor() {
    super();
    this.arService = new ARService();
  }

  async placeFurniture(modelId: string, position: Position): Promise<string> {
    const furnitureId = Date.now().toString();
    await this.arService.placeObject(`assets/models/${modelId}.glb`, position);
    
    this.placedFurniture.set(furnitureId, {
      id: furnitureId,
      modelId,
      position,
      timestamp: new Date()
    });

    return furnitureId;
  }

  async moveFurniture(furnitureId: string, newPosition: Position): Promise<void> {
    const furniture = this.placedFurniture.get(furnitureId);
    if (!furniture) return;

    await this.arService.placeObject(`assets/models/${furniture.modelId}.glb`, newPosition);
    furniture.position = newPosition;
    this.placedFurniture.set(furnitureId, furniture);
  }

  removeFurniture(furnitureId: string): void {
    // Remove from AR view and tracking
    this.placedFurniture.delete(furnitureId);
  }
}

interface Position {
  x: number;
  y: number;
  z: number;
}

interface PlacedFurniture {
  id: string;
  modelId: string;
  position: Position;
  timestamp: Date;
}