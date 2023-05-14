import { For, Suspense } from "solid-js";
import { RouteDataArgs, Title, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import ClassWithField from "~/class-with-field";
import Counter from "~/components/Counter";

export interface Root {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export interface Geo {
  lat: string
  lng: string
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}


export function routeData({ location }: RouteDataArgs) {
  return createServerData$(
    async (_, { request }) => {
      const item1 = new ClassWithField("foo");
      const item2 = new ClassWithField("bar");
      
      return [structuredClone(item1),structuredClone(item2)];
      
    }
  );
}

export default function Home() {
  const users = useRouteData<typeof routeData>();
  return (
    <main>
     
      <Suspense fallback={<div>Loading...</div>}>
        <For each={users()}>
        {(user) => <button onClick={(e) => alert('User')}>{user.name}</button>}
        </For>
      </Suspense>
    </main>
  );
}
