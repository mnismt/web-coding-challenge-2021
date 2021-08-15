import 'ol/ol.css'
import GeoJSON from 'ol/format/GeoJSON'
import Map from 'ol/Map'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import View from 'ol/View'
import { Fill, Stroke, Style, Text } from 'ol/style'
import { useEffect } from 'react'
import { useProvinceStore } from 'src/store'

const style = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.6)',
  }),
  stroke: new Stroke({
    color: '#319FD3',
    width: 1,
  }),
  text: new Text({
    font: '12px Calibri,sans-serif',
    fill: new Fill({
      color: '#000',
    }),
    stroke: new Stroke({
      color: '#fff',
      width: 3,
    }),
  }),
})

const Map2D = () => {
  const setProvince = useProvinceStore((state) => state.setProvince)
  useEffect(() => {
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        url: 'https://raw.githubusercontent.com/Vizzuality/growasia_calculator/master/public/vietnam.geojson',
        format: new GeoJSON(),
      }),
      style: function (feature) {
        style.getText().setText(feature.get('name'))
        return style
      },
    })
    const map = new Map({
      layers: [vectorLayer],
      target: 'map',
      view: new View({
        center: [14.0583, 108.2772],
        zoom: 2,
      }),
    })
    map.on('click', (e) => {
      map.forEachFeatureAtPixel(e.pixel, function (feature) {
        const provinceName = feature.get('name')
        setProvince(provinceName)
      })
    })
  }, [])
  return <div id="map" className="w-full h-full"></div>
}

export default Map2D
