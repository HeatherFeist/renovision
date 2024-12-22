export interface Project {
  id: string;
  name: string;
  description: string;
  roomType: RoomType;
  style: DesignStyle;
  budget: number;
  materials: Material[];
  scans: ScanData[];
  createdAt: Date;
  updatedAt: Date;
}

export enum RoomType {
  KITCHEN = 'kitchen',
  BATHROOM = 'bathroom',
  LIVING_ROOM = 'living_room',
  BEDROOM = 'bedroom',
  OTHER = 'other'
}

export enum DesignStyle {
  MODERN = 'modern',
  RUSTIC = 'rustic',
  MINIMALIST = 'minimalist',
  TRADITIONAL = 'traditional'
}

export interface Material {
  id: string;
  name: string;
  type: string;
  price: number;
  unit: string;
  quantity: number;
}

export interface ScanData {
  id: string;
  url: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  createdAt: Date;
}