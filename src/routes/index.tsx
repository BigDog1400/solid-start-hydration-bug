import { For, Suspense } from "solid-js";
import { RouteDataArgs, Title, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import ClassWithField from "~/class-with-field";



export function routeData({ location }: RouteDataArgs) {
  return createServerData$(
    async (_, { request }) => {
      const item1 = new ClassWithField("foo");
      const item2 = new ClassWithField("bar");
      
      return [item1,item2];
      
    }
  );
}

export default function Home() {
  const items = useRouteData<typeof routeData>();
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <For each={items()}>
        {(item) => <button onClick={(e) => alert('User')}>{item.name}</button>}
        </For>
      </Suspense>
    </main>
  );
}
