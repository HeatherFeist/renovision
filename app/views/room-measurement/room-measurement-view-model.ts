import { Observable } from '@nativescript/core';
import { MeasurementService } from '../../services/measurement.service';

export class RoomMeasurementViewModel extends Observable {
  private measurementService: MeasurementService;
  private _measurementInfo: string = '';

  constructor() {
    super();
    this.measurementService = new MeasurementService();
  }

  get measurementInfo(): string {
    return this._measurementInfo;
  }

  set measurementInfo(value: string) {
    if (this._measurementInfo !== value) {
      this._measurementInfo = value;
      this.notifyPropertyChange('measurementInfo', value);
    }
  }

  async startMeasurement(): Promise<void> {
    try {
      const roomId = Date.now().toString();
      const measurement = await this.measurementService.measureRoom(roomId);
      this.measurementInfo = `Room dimensions:\nWidth: ${measurement.width}m\nLength: ${measurement.length}m\nHeight: ${measurement.height}m\nArea: ${measurement.area}m²`;
    } catch (error) {
      console.error('Measurement failed:', error);
      this.measurementInfo = 'Failed to measure room. Please try again.';
    }
  }

  async generateFloorPlan(): Promise<void> {
    // Implementation for floor plan generation
  }
}