export enum RoomCapacity {
  SINGLE = 'single',
  DOUBLE = 'double',
  KINGSUITE = 'kingsuite', // 2 people but with large bed
  FAMILYSUITE = 'familysuite',
}

export const RoomCapacityDetails = {
  [RoomCapacity.SINGLE]: { people: 1, bed: 'single' },
  [RoomCapacity.DOUBLE]: { people: 2, bed: 'double' },
  [RoomCapacity.KINGSUITE]: { people: 2, bed: 'king' },
  [RoomCapacity.FAMILYSUITE]: { people: 4, bed: 'queen', extraBeds: true },
};
