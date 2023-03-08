import { XMLParser } from "fast-xml-parser";

export type Bus = {
  bearing: number;
  destinationName: string;
  destinationRef: string;
  directionRef: string;
  framedVehicleJourneyRef: {
    dataFrameRef: string;
    datedVehicleJourneyRef: number;
  };
  lineRef: number | string;
  operatorRef: string;
  originAimedDepartureTime: string;
  originName: string;
  originRef: string;
  publishedLineName: number | string;
  vehicleLocation: [number, number];
  vehicleRef: string;
};

const getBusesFromDatafeed = async (datafeedId: number): Promise<Bus[]> => {
  const response = await fetch(
    `${
      import.meta.env.VITE_CORS_HOST
    }/https://data.bus-data.dft.gov.uk/api/v1/datafeed/${datafeedId}/?api_key=${
      import.meta.env.VITE_BUS_KEY
    }`,
  );

  const text = await response.text();

  const parser = new XMLParser();
  const data = parser.parse(text);

  const activities =
    data.Siri.ServiceDelivery.VehicleMonitoringDelivery.VehicleActivity;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const journeys = activities.map((a: any) => a.MonitoredVehicleJourney);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buses: Bus[] = journeys.map((j: any) => ({
    bearing: j.Bearing,
    destinationName: j.DestinationName,
    destinationRef: j.DestinationRef,
    directionRef: j.DirectionRef,
    framedVehicleJourneyRef: {
      dataFrameRef: j.FramedVehicleJourneyRef.DataFrameRef,
      datedVehicleJourneyRef: j.FramedVehicleJourneyRef.DatedVehicleJourneyRef,
    },
    lineRef: j.LineRef,
    operatorRef: j.OperatorRef,
    originAimedDepartureTime: j.OriginAimedDepartureTime,
    originName: j.OriginName,
    originRef: j.OriginRef,
    publishedLineName: j.PublishedLineName,
    vehicleLocation: [j.VehicleLocation.Latitude, j.VehicleLocation.Longitude],
    vehicleRef: j.VehicleRef,
  }));

  return buses;
};

export const getBuses = async (
  datafeedIds: number[],
  drawEvery: number,
): Promise<Bus[]> => {
  const busPromises = datafeedIds.map(getBusesFromDatafeed);
  const busCollections = await Promise.all(busPromises);
  const buses = busCollections.flat();

  console.log(`There are ${buses.length} buses!`);

  const reducedBuses = buses.filter((_, i) => i % drawEvery === 0);

  return reducedBuses;
};
