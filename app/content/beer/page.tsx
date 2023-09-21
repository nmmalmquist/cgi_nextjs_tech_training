import styles from "./beer.module.css";
import Image from "next/image";


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
                        <span>Winery: {popularWine[0].winery}</span>
                        <span>Name: {popularWine[0].wine}</span>
                        <span>Location: {popularWine[0].location}</span>
                        <span>
                            Average Rating: {popularWine[0].rating.average}
                        </span>
                    </div>
                </div>
                <h1 className="text-6xl mt-4">Most popular wine!</h1>
            </div>
            <hr className="my-20" />
            <h1 className="text-center text-4xl">List of beers</h1>
            <div className={styles.customGrid}>
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
                            <span>Name: {beer.name}</span>
                            <span>Price: {beer.price}</span>
                            <span>Reviews: {beer.rating.reviews}</span>
                            <span>Average Rating: {beer.rating.average}</span>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default BeerWine;
