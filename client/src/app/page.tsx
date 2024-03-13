"use client";
import Image from "next/image";
import useSWR from "swr";

export default function Home() {
  const { data, error, isLoading, isValidating } = useSWR(
    "http://localhost:9000/getUsers",
    fetcher
  );

  if (error) {
    console.log(error);

    return <div>error</div>;
  }
  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      <h1>nice</h1>
      <h1>{data.result}</h1>
    </ul>
  );
}

async function fetcher(url: string) {
  const response = await fetch(url);
  return await response.json();
}
