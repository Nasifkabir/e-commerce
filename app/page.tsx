import { Navbar } from "@/components/saad/nabar";
export default function Root() {
  return (
    <>
    <main>

<Navbar />

      {/*You can test you componets down below */}
      <h1 className="bg-red-500 py-5 text-3xl text-center">Wallah Habibi! Let&apos;s get sarted </h1>



    </main>
    <footer>
      <h6 className="absolute w-full bottom-0 bg-amber-500 flex items-center justify-center">Root page</h6>
    </footer>
    </>
  );
}
