import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { MapContainer, useMap, TileLayer, ScaleControl, Popup, Marker } from 'react-leaflet';
import L, { Icon } from 'leaflet';
import tileLayer from 'util/tileLayer';
import { useGetCitiesQuery } from 'features/core/tools';
import { Button, Form } from 'react-bootstrap';
import markIcon from 'assets/icons/marker-icon.png'
import ErrorText from 'components/common/ErrorText';
import { AgencyPropertyContext } from '../AgencyPropertyApp';
import InputProperty from './InputProperty';
import { useFormContext } from 'react-hook-form';
import { CreatePropertyFromData } from './CreateProperty';
import { ICity } from 'types/properties';

const markerIcon = new Icon({
  iconUrl: markIcon,
})

const center = [36.75390000, 3.05890000];

interface GetCoordinatesProps {
  newPos: string[] | number[]
}
const GetCoordinates = ({ newPos }: GetCoordinatesProps) => {
  const { setValue, getValues } = useFormContext()
  // const { position, setPosition } = useContext(AgencyPropertyContext)

  const [position, setPosition] = useState<string[]>([])

  // useEffect(()=>{
  //   const pos:string[] = getValues(['latitude','longitude'])
  //   if (pos){

  //     setPosition(pos)
  //     if(map)
  //       map.flyTo(pos, 13)
  //   }
  // },[])

  const map = useMap();
  useEffect(() => {
    if (!map) return;

    map.flyTo(newPos, 13)
  }, [newPos])

  useEffect(() => {

    if (!map) return;

    map.on('click', (e: any) => {
      setValue('latitude', e.latlng.lat)
      setValue('longitude', e.latlng.lng)
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
        draggable={true}
        position={position} on icon={markerIcon}>
        <Popup>
          <Button onClick={() => setPosition([])}>delete</Button>
        </Popup>
      </Marker> : null
  )

}


const PropertyMap = () => {
  const { register, formState: { errors }, setValue ,getValues } = useFormContext<CreatePropertyFromData>()


  const { position } = useContext(AgencyPropertyContext)
  const { data: cities, isSuccess } = useGetCitiesQuery({})

  const [newPos, setNewPos] = useState((position.length > 0 ? position : center))


  const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!cities) return;
    const city = cities.filter((c:ICity) => `${c.id}` == event.target.value)
    setNewPos([city[0].lat, city[0].lng])
  }

  return (
    <div>

      <Form.Group className="mb-4 " >
        <Form.Label>City</Form.Label>
        <Form.Select
          onSelect={handleCityChange}
          placeholder='City'
          {...register("city", { required: "This Feild Is required", onChange: handleCityChange })}
        >
          <option>city</option>
          {cities && cities.map((city: ICity) => (
            <option selected={getValues('city') == `${city.id}`} key={city.id} value={city.id}>{city.name}</option>
          ))}
        </Form.Select>
        {/* <ErrorText name='city' error={error} /> */}
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