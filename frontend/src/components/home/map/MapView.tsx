import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import {FC} from "react";

const MapView: FC = (props: any) => {
    const {position, zoom} = props

    return (
        <MapContainer
            center={position}
            zoom={zoom}
            scrollWheelZoom={false}
            className={"w-full h-full"}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br/> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}
export default MapView;