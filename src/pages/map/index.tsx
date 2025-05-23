import Button from "@/components/ui/button";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const MapView = dynamic(() => import("@/components/views/map/MapView"), { ssr: false });

export default function Map() {
  return (
    <div className="container flex items-center my-10">
      <div className="w-full flex items-center justify-center gap-10">
        <div className=" border-2 border-accent rounded-full overflow-hidden hover:rounded-lg transition-all duration-300 ease-in-out w-[350px] h-[350px] xl:w-[600px] xl:h-[600px]">
          <MapView />
        </div>
        <div className="w-[50%] text-7xl flex flex-col gap-5">
          <div>
            <h2 className="text-accent mb-3 uppercase">Margasana</h2>
            <h1>Village</h1>
            <p className="text-lg text-third">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
              placeat praesentium dignissimos ipsa maxime et facere porro vel
              quisquam voluptatem.
            </p>
          </div>
          <div className="text-xl flex items-center  justify-end ">
            <Link
              href={"/mapview"}
              className="flex items-center bg-accent px-2 rounded-full text-primary hover:opacity-80 transition-all duration-300 ease-in-out"
            >
              <Button
                type="button"
                textcolor="text-primary"
                bgcolor="bg-accent rounded-full"
              >
                View More
              </Button>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
