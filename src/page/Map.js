import 'leaflet-draw/dist/leaflet.draw.css';
import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from "react-router-dom";
import { Map, TileLayer, FeatureGroup, Polygon, Popup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import { AreaContext } from '../context/AreaContextProvider';

const mapStyle = {
    height: '83vh',
    width: '100%',
    marginRight: 10
};

// [37, -111.05],[44, -109.03],[41, -105.05]

export default class MapPage extends Component {

  state = {
    coord: [[],[],[]],
    dropdownOpen: false,
    save: {
      name: "",
      area: 0
    },
    latLngs: []
  }

  componentDidMount(){
    const north = L.control()
    const map = this.refs.map.leafletElement
    north.onAdd = function(map) {
      var div = L.DomUtil.create("div", "info legend");
      return div;
  }
    north.addTo(map)
    L.control.scale().addTo(map);
  }

  handleAddCoord = (e) => {
    //e.preventDefault()
    this.setState(
      {
        zero: 1,
        coord: this.state.coord.concat([[]])
      }
    )
  }

  handleInsertCoord = (e, index1, index2) => {
    let value = e.target.value;
    //console.log(value)
    this.setState((state, props) => {
      const coord = state.coord.map((item, j) => {
        if (j === index1) {
          item[index2] = Number(value);
          return item;
        } else {
          return item;
        }
      });

      return {
        coord,
      };
    });
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  zeroChecking = () => {
    const { coord } = this.state;
    let zero = 0;
    coord.map((item, index) => {
      if (item.length < 2) {
        zero++
      }
    })
    this.setState({zero});
    if (zero == 0) {
      return true
    } else {
      return false
    }
  }

  handleCheck = () => {
    const map = this.refs.map.leafletElement;
    const { coord } = this.state;
    if(this.zeroChecking()){
      const polygon = L.polygon(coord);
      map.flyToBounds(polygon.getBounds());
      this.handleArea(polygon.getLatLngs()[0]);
    } else {
      alert('Must insert coordinate')
    }
  }

  handleRemoveCoord = () => {
    this.setState(state => {
      const coord = state.coord.filter((item, j) => state.coord.length - 1 !== j);
      return {
        coord,
      };
    });
  }
  
  handleArea = (latLngs) => {
    let area = L.GeometryUtil.geodesicArea(latLngs);
   area =  L.GeometryUtil.readableArea(area, true);
    this.setState({
      save: {
        ...this.state.save,
        area,
        latLngs
      }
    });
  }

  handleName = (name) => {
    this.setState({
      save: {
        ...this.state.save,
        name
      }
    });
    //console.log(this.state.save)
  }

  handleSave = () => {
    const { save } = this.state;
    localStorage.setItem(save.name, JSON.stringify(save));
    this.setState({
      save: {
        name: "",
        area: 0
      }
    })
  }

  coordPopup = (e) => {
    const map = this.refs.map.leafletElement;
    L.popup()
    .setLatLng(e.latlng) 
    .setContent(e.latlng.toString().replace('LatLng',''))
    .openOn(map);
  }

  render() {
    //console.log(this.state.coord, this.state.zero)
    return (
      <div style={{display:'flex'}}>
        <div style={{display:'flex', flexDirection:'column', flex:1 ,marginLeft: 10, marginTop:10, marginRight:10, justifyContent:'space-between'}}>
          <div style={{display:'flex', flexDirection:'column'}}>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                Selected Area
              </DropdownToggle>
              <DropdownMenu>
                <Link to={{
                  pathname: '/result',
                  state: {
                    update: true
                  }
                }}><DropdownItem key={0}>Demo Area</DropdownItem></Link>
                <AreaContext.Consumer>{(context => {
                  return context.area.map((item, index) => {
                    return (
                      <DropdownItem key={index+1}>{item.name}</DropdownItem>
                    )
                  })
                })}
                </AreaContext.Consumer>
              </DropdownMenu>
            </Dropdown>
            <h6 style={{marginTop:50}}>AREA SELECTION</h6>
            <h6 style={{marginTop:20}}>Input Coordinate</h6>
            <FormGroup>
              {this.state.coord.length && this.state.coord.map((val, index) => {
                return (
                  <div key={index}>
                    <Row form>
                      <Col md={6}>
                        <Input bsSize="sm" placeholder="Latitude" 
                          onChange={(e) => {this.handleInsertCoord(e,index,0)}}
                        />
                      </Col>
                      <Col md={6}>
                        <Input bsSize="sm" placeholder="Longitude"
                          onChange={(e) => {this.handleInsertCoord(e,index,1)}}
                        />
                      </Col>
                    </Row>
                  </div>
                )})
              }
            </FormGroup>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <Button size="sm" onClick={(e) => {this.handleAddCoord(e)}}>Add Coordinate</Button>
              <Button size="sm" onClick={() => {this.handleRemoveCoord()}} disabled={this.state.coord.length <= 3 ? true : false}>Clear</Button>
              <Button size="sm" onClick={(e) => {this.handleCheck()}}
              >Check</Button>
            </div>
          </div>
          <div style={{display:'flex', flexDirection:'column'}}>
            <div>
              <Input bsSize="sm" placeholder="Enter area name" value={this.state.save.name}
                onChange={(e) => {this.handleName(e.target.value)}}
              />
              <p>Area : {this.state.save.area}</p>
            </div>
            <div style={{display:'flex', alignSelf:'flex-end'}}>
              <form onSubmit={(e) => {this.handleSave()}}>
                <Button color='primary' style={{marginRight:10}}
                >Save</Button>
              </form>
            </div>
          </div>
        </div>
        <div style={{flex:5}}>
          <Map
            ref='map'
            style={{height:'100vh'}}
            zoom={5} 
            center={{ lat: 0, lng: 115 }}
            onMouseMove={(e) => {this.coordPopup(e)}}
          >
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            />
            <FeatureGroup>
              <EditControl
                position='topleft'
                //onEditMove={(e) => {this.handleArea(e.layer.getLatLngs()[0])}}
                //onEditResize={(e) => {this.handleArea(e.layer.getLatLngs()[0])}}
                //onEditVertex={(e) => {this.handleArea(e.poly.getLatLngs()[0])}}
                onCreated={(e) => {
                  this.handleArea(e.layer.getLatLngs()[0])
                }}
                onEdited={(e) => {
                  e.layers.eachLayer((layer) => {
                    this.handleArea(layer.getLatLngs()[0])
                  })
                }}
                onDeleted={(e) => {
                  e.layers.eachLayer((layer) => {
                    this.handleArea(layer.getLatLngs()[0])
                  })
                }}
                draw={{
                  circle: false,
                  line: false,
                  marker: false,
                  polyline: false,
                  circlemarker: false
                }}
              />
              {this.state.zero == 0 ?
                <Polygon positions={this.state.coord}/>
              :
                null
              }
            </FeatureGroup>
          </Map>
        </div>
      </div>
    )
  }
}