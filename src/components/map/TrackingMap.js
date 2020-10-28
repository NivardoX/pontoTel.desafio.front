import React from "react";
import { Map, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import "./leaflet.css";


class TrackingMap extends React.Component{


    constructor(props){
        super(props);
        this.state ={
            activeMarker: null
        };   
    }

    setActiveMarker(marker){
        this.setState({
            activeMarker: marker
        })
    }

    render(){
        return (

                <Map center={(this.props.tracking != undefined && this.props.tracking[0] != undefined ? [this.props.tracking[0][this.props.y], this.props.tracking[0][this.props.x]] : [-3.71, -38.54])} zoom={12}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />

                {this.props.tracking != undefined ?
                <React.Fragment>
                    <Polyline positions={this.props.tracking.map(cord => [cord[this.props.y], cord[this.props.x]])}/>
                    
                    {this.props.tracking.map(cord => ( 
                        <Marker key={cord.id} position={[cord[this.props.y],cord[this.props.x]]} onClick={() => {this.setActiveMarker(cord);}}/> 
                    ))}
                    
                    {this.state.activeMarker && (
                        <Popup
                            position={[
                                this.state.activeMarker[this.props.y],
                                this.state.activeMarker[this.props.x]
                            ]}
                            onClose={() => {
                                this.setActiveMarker(null);
                            }}
                            >
                            <div>
                                <h1>{this.state.activeMarker[this.props.popTitle]}</h1>
                                <p>IMEI:{this.state.activeMarker[this.props.popDescription]}</p>
                            </div>
                        </Popup>
                    )}
                </React.Fragment>
                :
                ""
                }
                
                </Map>

            
        );
    }
}



export {TrackingMap}