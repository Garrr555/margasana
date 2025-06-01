"use client";

import { usePopulationStats } from "@/hook/demografi";
import { Product } from "@/types/product.type";
import Image from "next/image";
import { useRouter } from "next/router";

type PropsTypes = {
  products: Product[];
};

export default function DetailRTRWPage() {
  const router = useRouter();
  const { rt, rw } = router.query;
  const { totalPopulation, activeProducts } = usePopulationStats();

  console.log(activeProducts);
  console.log(rt, rw);
  console.log("router.query:", router.query);
  console.log("rt type:", typeof rt, "rw type:", typeof rw);
  console.log("activeProducts length:", activeProducts.length);

  if (!rt || !rw) {
    return <div>Loading...</div>;
  }

  const filteredPopulation = activeProducts.filter(
    (person: any) => 0+person.rt === rt && 0+person.rw === rw
  );

  console.log(filteredPopulation);

  return (
    <div className="container my-10">
      <h1 className="text-2xl font-bold mb-4">
        Data Penduduk RT:<span className="text-accent"> {rt}</span> - RW:
        <span className="text-accent"> {rw}</span>
      </h1>
      {filteredPopulation.length === 0 ? (
        <p>
          Tidak ada data penduduk untuk RT {rt} RW {rw}.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {filteredPopulation.map((person: any) => (
            <li key={person.id} className="rounded-md shadow-sm">
              <div className="container ">
                <div className="flex items-center w-full my-3 bg-secondary overflow-hidden rounded-lg ">
                  <div className="w-[450px] xl:w-[600px] flex justify-start items-center">
                    <Image
                      src={person?.image}
                      alt={person?.name}
                      height={300}
                      width={300}
                      className="w-[450px] h-[450px] xl:w-[600px] xl:h-[600px]"
                    />
                  </div>
                  <div className="w-1/2 h-[450px] xl:h-[600px] flex flex-col justify-between mx-auto py-3">
                    <div className="flex flex-col gap-8 justify-center">
                      <h1 className="text-4xl font-extrabold">
                        {person?.name}
                      </h1>
                      <div className="grid gap-1">
                        <div className="flex">
                          <span className="min-w-[100px] font-light">
                            RT/RW
                          </span>
                          <span className="text-third">
                            : {person?.rt} / {person?.rw}
                          </span>
                        </div>
                        <div className="flex">
                          <span className="min-w-[100px] font-light">
                            Gender
                          </span>
                          <span className="text-third">
                            : {person?.category}
                          </span>
                        </div>
                        <div className="flex">
                          <span className="min-w-[100px] font-light">Age</span>
                          <span className="text-third">: {person?.age}</span>
                        </div>
                        <div className="flex">
                          <span className="min-w-[100px] font-light">Date</span>
                          <span className="text-third">: {person?.date}</span>
                        </div>
                        <div className="flex">
                          <span className="min-w-[100px] font-light">
                            Religion
                          </span>
                          <span className="text-third">
                            : {person?.religion}
                          </span>
                        </div>
                        <div className="flex">
                          <span className="min-w-[100px] font-light">
                            Marital
                          </span>
                          <span className="text-third">
                            : {person?.martial}
                          </span>
                        </div>
                        <div className="flex">
                          <span className="min-w-[100px] font-light">Job</span>
                          <span className="text-third">: {person?.job}</span>
                        </div>
                        <div className="flex">
                          <span className="min-w-[100px] font-light">
                            Income
                          </span>
                          <span className="text-third">: {person?.income}</span>
                        </div>
                        <div className="flex">
                          <span className="min-w-[100px] font-light">
                            Status
                          </span>
                          <span>
                            :{" "}
                            <span
                              className={`${
                                person.family === "leader"
                                  ? "text-accent font-bold"
                                  : "text-third"
                              }`}
                            >
                              {person?.family}
                            </span>
                          </span>
                        </div>
                      </div>
                      <hr />
                      <h3 className="text-xl text-accent font-bold">
                        {person?.nik} - {person?.kk}
                      </h3>
                    </div>
                    <div className="w-full"></div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
