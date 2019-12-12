import React, { Component } from 'react';
import { Input, TabContent, TabPane, Button, ButtonGroup } from 'reactstrap';
import { Map, TileLayer } from "react-leaflet";
import { PlottyGeotiffLayer } from "../components/GeotiffLayer";
import AreaTab from "../components/AreaTab";
import RawTab from "../components/RawTab";
import ProcessedTab from "../components/ProcessedTab";
import { MineralContext } from '../context/MineralContextProvider';
import { RawContext } from '../context/RawContextProvider';
import { StrukturContext } from '../context/StrukturContextProvider';
import TargetTab from '../components/TargetTab';
import { TargetContext } from '../context/TargetContextProvider';

const GeoTIFF = require('geotiff');
const utmObj = require('utm-latlng')

export default class Result extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            bounds: null,
        };
    }

    async componentDidMount(){
      //const response = await fetch("https://stuartmatthews.github.io/leaflet-geotiff/tif/wind_speed.tif");
      const response = await fetch(require("../images/Mineral/Alunite_New.tif"));
      const arrayBuffer = await response.arrayBuffer();
      const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
      const image = await tiff.getImage();
      const x_min = image.getBoundingBox()[0]
      const y_min = image.getBoundingBox()[1]
      const x_max = image.getBoundingBox()[2]
      const y_max = image.getBoundingBox()[3]
      //console.log(image.getGDALMetadata());
      //console.log(image.getSamplesPerPixel());
      //console.log(image.getResolution());
      //console.log(image.getTiePoints());
      const utm = new utmObj();
      const min = utm.convertUtmToLatLng(x_min, y_min, 47, 'N')
      const max = utm.convertUtmToLatLng(x_max, y_max, 47, 'N')
      this.setState({
        min,
        max,
        bounds: [[min.lat, min.lng],[max.lat, max.lng]],
      })
      const map = this.refs.map.leafletElement
      map.fitBounds(
          [[min.lat, min.lng],[max.lat, max.lng]]
      )
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
    }

    render() {        
        return (
            <div style={{display:'flex'}}>
                <div style={{marginTop:10, flex:1}}>
                  <ButtonGroup>
                    <Button
                        size='sm'
                        color="link" 
                        style={{textDecoration:'none', color:'white', opacity:'0.5'}}
                        onClick={() => { this.toggle('1'); }}
                    >Area</Button>
                    <Button
                        size='sm' 
                        color="link" 
                        style={{textDecoration:'none', color:'white', opacity:'0.5'}}
                        onClick={() => { this.toggle('2'); }}
                    >RAW</Button>
                    <Button
                        size='sm' 
                        color="link" 
                        style={{textDecoration:'none', color:'white', opacity:'0.5'}}
                        onClick={() => { this.toggle('3'); }}
                    >Processed</Button>
                    <MineralContext.Consumer>{(context) => {
                      const { process } = context;
                      return (
                        <Button
                            disabled={!process}
                            size='sm' 
                            color="link" 
                            style={{textDecoration:'none', color:`${process ? 'white' : 'grey'}`, opacity:'0.5'}}
                            onClick={() => { this.toggle('4'); }}
                        >Target</Button>                        
                      )
                    }}
                    </MineralContext.Consumer>
                  </ButtonGroup>
                  <TabContent style={{marginLeft:20, marginTop:20}} activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <AreaTab/>
                    </TabPane>
                    <TabPane tabId="2">
                      <RawTab/>
                    </TabPane>
                    <TabPane tabId="3">
                      <ProcessedTab/>
                    </TabPane>
                    <TabPane tabId="4">
                      <TargetTab/>
                    </TabPane>
                  </TabContent>
                </div>
                <div style={{flex:5}}>
                  <Map
                    ref='map'
                    style={{height:'100vh'}}
                    //zoom={5} 
                    //center={{ lat: 0, lng: 115 }}
                  >
                    <TileLayer
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                      attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                    />
                    <RawContext.Consumer>{(context) => {
                      //console.log(context)
                      return context.raw.map((item, index) => {
                        if(context.display[index].display){
                            return (
                                <div key={index}>
                                    <PlottyGeotiffLayer
                                      url={context.raw[index]}
                                      options={{
                                        zIndex: 0,
                                        opacity: context.display[index].opacity,
                                        bounds: this.state.bounds,
                                        colorScale: context.display[index].colorScale,
                                        }}
                                    />                                        
                                </div>
                            )
                        } else {
                            return null
                        }
                    })
                    }}
                    </RawContext.Consumer>
                    <MineralContext.Consumer>{(context) => {
                      //console.log(context.display)
                      return context.mineral.map((item, index) => {
                        if(context.displayMineral[index].display){
                            return (
                                <div key={index}>
                                      <PlottyGeotiffLayer
                                        url={context.mineral[index]}
                                        options={{
                                          zIndex: 1,
                                          bounds: this.state.bounds,
                                          colorScale: context.displayMineral[index].colorScale,
                                          }}
                                      />                                     
                                </div>
                            )
                        } else {
                            return null
                        }
                    })
                    }}
                    </MineralContext.Consumer>
                    <StrukturContext.Consumer>{(context) => {
                      //console.log(context)
                      return context.struktur.map((item, index) => {
                        if(context.displayStruktur[index].display){
                            return (
                                <div key={index}>
                                    <PlottyGeotiffLayer
                                      url={context.struktur[index]}
                                      options={{
                                        zIndex: 1,
                                        bounds: this.state.bounds,
                                        colorScale: context.displayStruktur[index].colorScale,
                                      }}
                                    />                                        
                                </div>
                            )
                        } else {
                            return null
                        }
                    })
                    }}
                    </StrukturContext.Consumer>
                    <TargetContext.Consumer>{(context) => {
                      //console.log(context)
                      return context.target.map((item, index) => {
                        if(context.displayTarget[index].display){
                            return (
                                <div key={index}>
                                    <PlottyGeotiffLayer
                                      url={context.target[index]}
                                      options={{
                                        zIndex: 2,
                                        bounds: this.state.bounds,
                                        colorScale: context.displayTarget[index].colorScale,
                                      }}
                                    />                                        
                                </div>
                            )
                        } else {
                            return null
                        }
                    })
                    }}
                    </TargetContext.Consumer>
                  </Map>
                </div>
            </div>
            
        )
    }
}

