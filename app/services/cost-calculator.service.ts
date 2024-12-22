import { Observable } from '@nativescript/core';
import { Material } from '../models/project.model';

export class CostCalculatorService extends Observable {
  calculateTotalCost(materials: Material[]): number {
    return materials.reduce((total, material) => {
      return total + (material.price * material.quantity);
    }, 0);
  }

  calculateMaterialNeeded(area: number, materialCoverage: number): number {
    // Add 10% for waste/cuts
    return Math.ceil(area / materialCoverage * 1.1);
  }

  estimateLaborCost(area: number, ratePerHour: number): number {
    // Simplified labor estimation
    const hoursNeeded = area * 0.5; // 0.5 hours per square meter
    return hoursNeeded * ratePerHour;
  }
}