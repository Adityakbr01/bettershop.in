"use client";

import { Button } from "@/components/ui/button";
import { usePing } from "@/queries/test/test";
import useCounterStore from "@/store/test";
import toast from "react-hot-toast";

export default function Home() {
  const { data, isLoading, isError } = usePing();




  return (
    <div>
      <h1>Ping Response</h1>
      <Button onClick={()=>{toast.success("Hello Sir")}}>Increase Bears</Button>
    </div>
  );
}
