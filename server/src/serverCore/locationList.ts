import { LocationInfo } from 'src/models/locationInfo';

export const LocationList = new Map<string, LocationInfo>([
    ['test01', {locationName: 'Test area 01', levelData: `
    {"l":[[0,[[10,2,2],[11,2,2],[12,2,2],[13,2,2],[14,2,2],[10,3,2],[14,3,2],[14,4,2],[10,5,2],[14,5,2],[0,6,2],[2,6,2],[3,6,2],[4,6,2],[10,6,2],[11,6,2],[12,6,2],[13,6,2],[14,6,2],[4,7,2],[4,8,2],[5,8,2],[6,8,2],[6,9,2],[7,9,2],[0,10,2],[1,10,2],[2,10,2],[7,10,2],[2,11,2],[7,11,2],[2,12,2],[7,12,2],[2,13,2],[3,13,2],[4,13,2],[5,13,2],[6,13,2],[7,13,2],[2,-8,2],[3,-8,2],[4,-8,2],[5,-8,2],[6,-8,2],[2,-7,2],[6,-7,2],[2,-6,2],[6,-6,2],[2,-5,2],[3,-5,2],[4,-5,2],[6,-5,2],[-23,0,2],[-20,0,2],[-19,0,2],[-23,1,2],[-20,1,2],[-19,1,2],[-23,2,2],[-13,2,2],[-12,2,2],[-9,2,2],[-6,2,2],[-3,2,2],[-23,3,2],[-13,3,2],[-12,3,2],[-11,3,2],[-10,3,2],[-9,3,2],[-8,3,2],[-7,3,2],[-6,3,2],[-5,3,2],[-4,3,2],[-3,3,2],[-23,4,2],[-20,4,2],[-19,4,2],[-12,4,2],[-23,5,2],[-20,5,2],[-19,5,2],[-12,5,2],[-23,6,2],[-12,6,2],[-1,6,2],[-23,7,2],[-12,7,2],[-1,7,2],[-23,8,2],[-22,8,2],[-21,8,2],[-20,8,2],[-19,8,2],[-13,8,2],[-12,8,2],[-1,8,2],[-19,9,2],[-18,9,2],[-17,9,2],[-16,9,2],[-15,9,2],[-14,9,2],[-13,9,2],[-1,9,2],[-1,10,2],[-19,-9,2],[-18,-9,2],[-17,-9,2],[-16,-9,2],[-15,-9,2],[-14,-9,2],[-13,-9,2],[-23,-8,2],[-22,-8,2],[-21,-8,2],[-20,-8,2],[-19,-8,2],[-13,-8,2],[-12,-8,2],[-23,-7,2],[-12,-7,2],[-23,-6,2],[-12,-6,2],[-23,-5,2],[-20,-5,2],[-19,-5,2],[-12,-5,2],[-23,-4,2],[-20,-4,2],[-19,-4,2],[-12,-4,2],[-23,-3,2],[-13,-3,2],[-12,-3,2],[-11,-3,2],[-10,-3,2],[-9,-3,2],[-8,-3,2],[-7,-3,2],[-6,-3,2],[-5,-3,2],[-4,-3,2],[-3,-3,2],[-23,-2,2],[-13,-2,2],[-12,-2,2],[-9,-2,2],[-6,-2,2],[-3,-2,2],[-23,-1,2],[-20,-1,2],[-19,-1,2]]],[-1,[[10,2,1],[11,2,1],[12,2,1],[13,2,1],[14,2,1],[10,3,1],[11,3,1],[12,3,1],[13,3,1],[14,3,1],[10,4,1],[11,4,1],[12,4,1],[13,4,1],[14,4,1],[10,5,1],[11,5,1],[12,5,1],[13,5,1],[14,5,1],[1,6,1],[10,6,1],[11,6,1],[12,6,1],[13,6,1],[14,6,1],[0,7,1],[1,7,1],[2,7,1],[3,7,1],[0,8,1],[1,8,1],[2,8,1],[3,8,1],[4,8,1],[0,9,1],[1,9,1],[2,9,1],[3,9,1],[4,9,1],[5,9,1],[3,10,1],[4,10,1],[5,10,1],[6,10,1],[3,11,1],[4,11,1],[5,11,1],[6,11,1],[3,12,1],[4,12,1],[5,12,1],[6,12,1],[3,-7,1],[4,-7,1],[5,-7,1],[3,-6,1],[4,-6,1],[5,-6,1],[5,-5,1],[-22,0,1],[-21,0,1],[-20,0,1],[-19,0,1],[-18,0,1],[-17,0,1],[-16,0,1],[-15,0,1],[-14,0,1],[-13,0,1],[-12,0,1],[-11,0,1],[-10,0,1],[-9,0,1],[-8,0,1],[-7,0,1],[-6,0,1],[-5,0,1],[-4,0,1],[-3,0,1],[-23,1,1],[-22,1,1],[-21,1,1],[-20,1,1],[-19,1,1],[-18,1,1],[-17,1,1],[-16,1,1],[-15,1,1],[-14,1,1],[-13,1,1],[-12,1,1],[-11,1,1],[-10,1,1],[-9,1,1],[-8,1,1],[-7,1,1],[-6,1,1],[-5,1,1],[-4,1,1],[-3,1,1],[-22,2,1],[-21,2,1],[-20,2,1],[-19,2,1],[-18,2,1],[-17,2,1],[-16,2,1],[-15,2,1],[-14,2,1],[-13,2,1],[-12,2,1],[-11,2,1],[-10,2,1],[-9,2,1],[-8,2,1],[-7,2,1],[-6,2,1],[-5,2,1],[-4,2,1],[-3,2,1],[-22,3,1],[-21,3,1],[-20,3,1],[-19,3,1],[-18,3,1],[-17,3,1],[-16,3,1],[-15,3,1],[-14,3,1],[-13,3,1],[-12,3,1],[-22,4,1],[-21,4,1],[-20,4,1],[-19,4,1],[-18,4,1],[-17,4,1],[-16,4,1],[-15,4,1],[-14,4,1],[-13,4,1],[-22,5,1],[-21,5,1],[-18,5,1],[-17,5,1],[-16,5,1],[-15,5,1],[-14,5,1],[-13,5,1],[-22,6,1],[-21,6,1],[-20,6,1],[-19,6,1],[-18,6,1],[-17,6,1],[-16,6,1],[-15,6,1],[-14,6,1],[-13,6,1],[-23,7,1],[-22,7,1],[-21,7,1],[-20,7,1],[-19,7,1],[-18,7,1],[-17,7,1],[-16,7,1],[-15,7,1],[-14,7,1],[-13,7,1],[-20,8,1],[-19,8,1],[-18,8,1],[-17,8,1],[-16,8,1],[-15,8,1],[-14,8,1],[-13,8,1],[-1,8,1],[-17,-9,1],[-16,-9,1],[-15,-9,1],[-20,-8,1],[-19,-8,1],[-18,-8,1],[-17,-8,1],[-16,-8,1],[-15,-8,1],[-14,-8,1],[-13,-8,1],[-22,-7,1],[-21,-7,1],[-20,-7,1],[-19,-7,1],[-18,-7,1],[-17,-7,1],[-16,-7,1],[-15,-7,1],[-14,-7,1],[-13,-7,1],[-22,-6,1],[-21,-6,1],[-20,-6,1],[-19,-6,1],[-18,-6,1],[-17,-6,1],[-16,-6,1],[-15,-6,1],[-14,-6,1],[-13,-6,1],[-22,-5,1],[-21,-5,1],[-20,-5,1],[-19,-5,1],[-18,-5,1],[-17,-5,1],[-16,-5,1],[-15,-5,1],[-14,-5,1],[-13,-5,1],[-22,-4,1],[-21,-4,1],[-20,-4,1],[-19,-4,1],[-18,-4,1],[-17,-4,1],[-16,-4,1],[-15,-4,1],[-14,-4,1],[-13,-4,1],[-12,-4,1],[-22,-3,1],[-21,-3,1],[-20,-3,1],[-19,-3,1],[-18,-3,1],[-17,-3,1],[-16,-3,1],[-15,-3,1],[-14,-3,1],[-13,-3,1],[-23,-2,1],[-22,-2,1],[-21,-2,1],[-20,-2,1],[-19,-2,1],[-18,-2,1],[-17,-2,1],[-16,-2,1],[-15,-2,1],[-14,-2,1],[-13,-2,1],[-12,-2,1],[-11,-2,1],[-10,-2,1],[-9,-2,1],[-8,-2,1],[-7,-2,1],[-6,-2,1],[-5,-2,1],[-4,-2,1],[-3,-2,1],[-22,-1,1],[-21,-1,1],[-20,-1,1],[-19,-1,1],[-18,-1,1],[-17,-1,1],[-16,-1,1],[-15,-1,1],[-14,-1,1],[-13,-1,1],[-12,-1,1],[-11,-1,1],[-10,-1,1],[-9,-1,1],[-8,-1,1],[-7,-1,1],[-6,-1,1],[-5,-1,1],[-4,-1,1],[-3,-1,1]]]]}
    `}],
])