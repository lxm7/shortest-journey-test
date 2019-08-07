import React, { Component } from 'react';

import Select from '../components/Select';
import RouteList from '../components/RouteList';
import {
  findAllRoutes,
  getRoutesWithDistances,
  addTotalDistanceFromRoutes,
} from '../utils';
import {adjacencyGraph, DistanceRow} from '../constants';

export type IState = {
  selectedRoute: {
    start: string;
    end: string;
  };
  routes: any;
};

class App extends Component<{}, IState> {
  state = {
    selectedRoute: {
      start: 'A',
      end: 'E'
    },
    routes: [],
  };

  componentDidMount() {
    this.updateRoutes()
  }

  updateRoutes = () => {
    const {selectedRoute: {start, end}} = this.state;

    this.setState({
      routes: findAllRoutes(adjacencyGraph, start, end), 
    })
  }

  handleLocationUpdate = (e: React.ChangeEvent<HTMLSelectElement>, position: string) => {
    e.persist();

    this.setState((prevState: IState) => ({
      selectedRoute: {
        ...prevState.selectedRoute,
        [position]: e.target.value,
      }
    }), () => this.updateRoutes())
  }
  
  render() {
    return (
      <div className='App'>
        <h3>Select start / end for route:</h3>
        
        {['start', 'end'].map((position, i) => (
          <Select
            key={i}
            index={position}
            options={Object.keys(adjacencyGraph)}
            // @ts-ignore 
            value={this.state.selectedRoute[position]}
            updateValue={(e) => this.handleLocationUpdate(e, position)}
          />
        ))}

        <h3>Possible routes:</h3>
        <div className='route-list'>
          {getRoutesWithDistances(this.state.routes)
            .sort((a: DistanceRow, b: DistanceRow) => addTotalDistanceFromRoutes(a) - addTotalDistanceFromRoutes(b))
            .map((DistanceRow: DistanceRow[], i: number) => {
              return (
                <RouteList
                  key={i}
                  DistanceRow={DistanceRow}
                  distance={addTotalDistanceFromRoutes(DistanceRow)}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default App;