import * as React from 'react';

function ControlPanel({
  center,
  radius,
  onRadiusChanged,
  onCenterChanged
}: Props) {
  return (
    <div className="control-panel">
      <div style={{marginBottom: '2rem'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <label htmlFor="radius">Radius:</label>
            <input
              type="number"
              value={radius}
              onChange={e => onRadiusChanged(Number(e.target.value))}
            />
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <label htmlFor="lat">Lat:</label>
            <input
              type="number"
              value={center.lat}
              onChange={e =>
                onCenterChanged({lat: Number(e.target.value), lng: center.lng})
              }
            />
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <label htmlFor="lng">Lng:</label>
            <input
              type="number"
              value={center.lng}
              onChange={e =>
                onCenterChanged({lat: center.lat, lng: Number(e.target.value)})
              }
            />
          </div>
        </div>
      </div>

      <div className="links">
        <a
          href="https://becanee.vercel.app"
          target="_new">
          {new Date().getFullYear()} Becanee
        </a>
      </div>
    </div>
  );
}

type Props = {
  center: google.maps.LatLngLiteral;
  radius: number;
  onCenterChanged: (c: google.maps.LatLngLiteral) => void;
  onRadiusChanged: (r: number) => void;
};

export default React.memo(ControlPanel);