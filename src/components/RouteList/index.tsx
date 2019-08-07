import React from 'react';

import {DistanceRow} from '../../constants';

export type RouteListProps = {
  DistanceRow: DistanceRow[];
  distance: number;
}

const RouteList: React.SFC<RouteListProps> = ({ DistanceRow, distance }) => (
  <div className='route'>
    {DistanceRow
      .map((stop, i) => (
        <div key={i}>
          <span>{stop.end1}</span>

          <span>&#10141;</span>

          <span>{stop.end2}</span>
        </div>
      ))}

      <div className='route__distance'>Distance: {distance}</div>
  </div>
);


export default React.memo(RouteList);
