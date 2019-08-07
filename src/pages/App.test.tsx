import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import App from './App';
import * as utils from '../utils';

describe('root of application', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  let wrapper
  let handleLocationUpdateSpy;
  let intialRoutes;
  let updateRoutesSpy;

  beforeEach(() => {
    wrapper = mount<App>(<App />);
    intialRoutes = wrapper.state().routes
    handleLocationUpdateSpy = jest.spyOn(wrapper.instance(), 'handleLocationUpdate');
    updateRoutesSpy = jest.spyOn(wrapper.instance(), 'updateRoutes');
    wrapper.find('#start').simulate('change', { target: { value: 'B' }});
  });

  describe('handleLocationUpdate', () => {
    it('should call handleLocationUpdate when a select has changed', () => {
      expect(handleLocationUpdateSpy).toHaveBeenCalled();
    });

    it('if start select is updated to B, it should update select#start props accordingly', () => {
      expect(wrapper.find('#start').props().value).toEqual('B')
    });

    it('if end select is updated to C, it should update select#end props accordingly', () => {
      wrapper.find('#end').simulate('change', { target: { value: 'C' }});
      expect(wrapper.find('#end').props().value).toEqual('C')
    });

    it('should update a new list of routes once a select input has changed', () => {
      const updatedRoutes = wrapper.state().routes
      expect(wrapper.state().routes).toEqual([
        [ 'B', 'D', 'F', 'G', 'H', 'E' ],
        [ 'B', 'D', 'G', 'H', 'E' ],
        [ 'B', 'D', 'C', 'F', 'G', 'H', 'E' ],
        [ 'B', 'E' ]
      ]);
      expect(updatedRoutes).not.toEqual(intialRoutes);
    });

    it('should call updateRoutes method on state callback', () => {
      expect(updateRoutesSpy).toHaveBeenCalled();
    });
  });

  describe('updateRoutes', () => {
    it('should call findAllRoutes utils', () => {
      const findAllRoutesSpy = jest.spyOn(utils, 'findAllRoutes');
      wrapper.find('#end').simulate('change', { target: { value: 'C' }});
      expect(findAllRoutesSpy).toHaveBeenCalled();
    });
    
    it('should update a new list of routes once a select input has changed', () => {
      const updatedRoutes = wrapper.state().routes
      expect(wrapper.state().routes).toEqual([
        [ 'B', 'D', 'F', 'G', 'H', 'E' ],
        [ 'B', 'D', 'G', 'H', 'E' ],
        [ 'B', 'D', 'C', 'F', 'G', 'H', 'E' ],
        [ 'B', 'E' ]
      ]);
      expect(updatedRoutes).not.toEqual(intialRoutes);
    })
  });
});
