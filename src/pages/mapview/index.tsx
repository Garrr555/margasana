import dynamic from "next/dynamic";

const MapPage = dynamic(() => import("@/components/views/map/MapPage"), { ssr: false });

export default function MapMore(){
    return (
      <div>
        <div>
          <MapPage kelamin={false} kepadatan={true} total={true} usia={true}/>
        </div>
      </div>
    );
}