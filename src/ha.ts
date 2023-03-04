import {
  Connection,
  createConnection,
  createLongLivedTokenAuth,
  type HassEntities,
  type HassEntity,
} from "home-assistant-js-websocket";
import { writable, type Writable } from "svelte/store";

export const displayValue = (entity: HassEntity): string => {
  return `${entity.state} ${entity.attributes.unit_of_measurement ?? ""}`;
};

export const haConnect = async (): Promise<Connection> => {
  const auth = createLongLivedTokenAuth(
    import.meta.env.VITE_HA_HOST,
    import.meta.env.VITE_HA_LLAT,
  );

  const conn = await createConnection({ auth });

  return conn;
};

// This is a bit of a TS hack, as it can be undefined,
// but TS doesn't know that.
// This is on purpose, as the components that access this
// are only rendered if these exist.
export const haConn: Writable<Connection> = writable();
export const haEntities: Writable<HassEntities> = writable();
