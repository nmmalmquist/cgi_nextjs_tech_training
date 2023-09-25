import Loading from "@/app/components/Loading";
import styles from "./beer.module.css";
import Image from "next/image";
import { Suspense } from "react";

export const getBeer = async (): Promise<{ beerData: any[] }> => {
    const beerResponse = await fetch("https://api.sampleapis.com/beers/ale");
    const beerData = await beerResponse.json();
    return {
        beerData: beerData,
    };
};
export const getWine = async (): Promise<{ wineData: any[] }> => {
    const wineResponse = await fetch("https://api.sampleapis.com/wines/reds");
    const wineData = await wineResponse.json();
    return {
        wineData: wineData,
    };
};

// RENDERED SERVERSIDE
const BeerWine = async () => {
    const { beerData } = await getBeer();
    const { wineData } = await getWine();

    const popularWine = wineData.sort((a: any, b: any) => {
        if (a.rating.average < b.rating.average) return 1;
        if (a.rating.average > b.rating.average) return -1;
        return 0;
    });

    return (
        <main className={styles.container}>
            <Suspense fallback={<Loading />}>
                <div className="mt-10 w-full flex items-center flex-col">
                    <div key={popularWine[0].id} className={styles.card}>
                        <div className={styles.imageContainer}>
                            <Image
                                src={popularWine[0].image}
                                alt="profile"
                                fill
                                objectFit="contain"
                                className="object-contain position-relative"
                            />
                        </div>
                        <div className="flex flex-col m-3">
                            <span>
                                <span className="font-bold">Winery:</span>{" "}
                                {popularWine[0].winery}
                            </span>
                            <span>
                                <span className="font-bold">Name:</span>{" "}
                                {popularWine[0].wine}
                            </span>
                            <span>
                                <span className="font-bold">Location:</span>{" "}
                                {popularWine[0].location}
                            </span>
                            <span>
                                <span className="font-bold">
                                    Average Rating:
                                </span>{" "}
                                {popularWine[0].rating.average}
                            </span>
                        </div>
                    </div>
                    <h1 className="text-6xl mt-4">Most popular wine!</h1>
                </div>
                <hr className="w-[90%] my-10 mx-3 block" />
                <h1 className="text-center text-4xl mb-10">List of beers</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {beerData.map((beer) => (
                        <div key={beer.id} className={styles.card}>
                            <div className={styles.imageContainer}>
                                <Image
                                    src={beer?.image}
                                    alt="profile"
                                    fill
                                    objectFit="contain"
                                    className="object-contain position-relative"
                                />
                            </div>
                            <div className="flex flex-col m-3">
                                <span>
                                    <span className="font-bold">Name:</span>{" "}
                                    {beer.name}
                                </span>
                                <span>
                                    <span className="font-bold">Price:</span>{" "}
                                    {beer.price}
                                </span>
                                <span>
                                    <span className="font-bold">Rating:</span>{" "}
                                    {beer.rating.reviews}
                                </span>
                                <span>
                                    <span className="font-bold">
                                        Average Rating:
                                    </span>{" "}
                                    {beer.rating.average}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </Suspense>
        </main>
    );
};

export default BeerWine;
