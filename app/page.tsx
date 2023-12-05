import { Button } from "../gui-components/client";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col mt-48 gap-24">
        <Button CTA="Shop now" onClick={console.log("clicked")} svg></Button>
        <Button
          CTA="Shop now"
          style="secondary"
          onClick={console.log("clicked")}
          svg
        ></Button>
        <Button
          CTA="Shop now"
          style="tertiary"
          onClick={console.log("clicked")}
          svg
        ></Button>
        <Button
          CTA="Shop now"
          style="quaternary"
          onClick={console.log("clicked")}
          svg
        ></Button>
      </div>
    </main>
  );
}
