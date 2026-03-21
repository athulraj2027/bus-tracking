import { redis } from "../redis/redis.js";

export const updateLocation = async (
  busId: string,
  lat: number,
  lng: number,
) => {
  const data = {
    lat,
    lng,
    timestamp: Date.now(),
  };

  await redis.set(`bus:${busId}:location`, JSON.stringify(data));

  return data;
};

export const getLocation = async (busId: string) => {
  const data = await redis.get(`bus:${busId}:location`);

  return data ? JSON.parse(data) : null;
};
