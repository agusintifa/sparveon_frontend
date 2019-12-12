import "leaflet-geotiff"
import "leaflet-geotiff/leaflet-geotiff-plotty"

import React from "react";
import { withLeaflet, MapLayer } from "react-leaflet";
import L from "leaflet";

class GeotiffLayer extends MapLayer {
  createLeafletElement(props) {
    const { url, options } = props;
    return L.leafletGeotiff(url, options);
  }

  componentDidMount() {
    const { map } = this.props.leaflet;
    const { zIndex } = this.props.options;    
    this.leafletElement.addTo(map);
    this.leafletElement.setZIndex(zIndex)
  }

  shouldComponentUpdate(){
    const { opacity } = this.props.options;
    this.leafletElement.setOpacity(opacity)
    return true
  }
  // componentDidUpdate() {
  //   const { opacity } = this.props.options;
  //   this.leafletElement.setOpacity(opacity)
  // }
}

export const PlottyGeotiffLayer = withLeaflet(props => {
  const { options, layerRef } = props;

  options.renderer = new L.LeafletGeotiff.Plotty(options);
  
  return <GeotiffLayer ref={layerRef} {...props} />;
});
