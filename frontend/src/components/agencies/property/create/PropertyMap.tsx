import { useContext, useEffect, useState } from 'react';
import { MapContainer, useMap, TileLayer, ScaleControl, Popup, Marker } from 'react-leaflet';
import L, { Icon } from 'leaflet';
import tileLayer from 'util/tileLayer';
import { useGetCitiesQuery } from 'features/core/tools';
import { Button, Form } from 'react-bootstrap';
import markIcon from 'assets/icons/marker-icon.png'
import ErrorText from 'components/common/ErrorText';
import { AgencyPropertyContext } from '../AgencyPropertyApp';

const markerIcon = new Icon({
  iconUrl: markIcon,
})

const center = [36.75390000, 3.05890000];

const GetCoordinates = ({ newPos }) => {

  const { position, setPosition } = useContext(AgencyPropertyContext)

  const map = useMap();
  useEffect(() => {
    if (!map) return;

    map.flyTo(newPos, 13)
  }, [newPos])

  useEffect(() => {
    if (!map) return;
    map.on('click', (e) => {
      setPosition([e.latlng.lat, e.latlng.lng])
    })

  }, [map])

  return (
    position.length > 0 ?
      <Marker
        eventHandlers={{
          dragend: (e) => {
            const p = e.target.getLatLng()
            setPosition([p.lat, p.lng])
          }
        }}
        draggable={true} position={position} on icon={markerIcon}>
        <Popup>
          <Button onClick={() => setPosition(null)}>delete</Button>
        </Popup>
      </Marker> : null
  )

}


const PropertyMap = ({ register, errors, watch, error }) => {
  const { position } = useContext(AgencyPropertyContext)
  const { data: cities, isSuccess } = useGetCitiesQuery({})
  console.log(position)
  const [newPos, setNewPos] = useState((position.length > 0 ? position : center))


  const handleCityChange = event => {
    if (!cities) return;
    const city = cities.filter((c) => c.id == event.target.value)
    setNewPos([city[0].lat, city[0].lng])
  }

  return (
    <div>
      <Form.Group className="mb-4 " >
        <Form.Label>City</Form.Label>
        <Form.Select onChange={handleCityChange} placeholder='City'
          {...register("city", { required: "This Feild Is required", onChange: handleCityChange })}
        >
          <option>city</option>
          {cities && cities.map((city) => (
            <option selected={register('city') == city.id} key={city.id} value={city.id}>{city.name}</option>
          ))}
        </Form.Select>
        <ErrorText name='city' error={error} />
        {errors.city && (
          <Form.Text className="text-danger">
            {errors.city.message}
          </Form.Text>
        )}
      </Form.Group>

      <div className='border mt-2'>

        <MapContainer className='border' center={position.length > 0 ? position : center}
          zoom={18} style={{ width: '100%', height: '350px' }} >
          <TileLayer {...tileLayer} />

          <ScaleControl imperial={false} />
          <GetCoordinates newPos={newPos} />

        </MapContainer>
      </div>
    </div>
  )
}

export default PropertyMap;