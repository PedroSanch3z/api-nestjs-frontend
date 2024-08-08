import { Inter } from "next/font/google";
import { FormularioTarea } from "@/components/FormularioTarea";
import { ListaTreas } from "@/components/ListaTreas";
import { NavBar } from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  
  return (
    <>
    <NavBar/>
    <main className="bg-gradient-to-r from-slate-900 to-slate-600 py-16 px-4
      flex flex-col items-center 
      sm:flex-col sm:justify-center 
      lg:px-8 lg:py-24 lg:flex-row lg:items-start lg:justify-start">
        
      <FormularioTarea/>
      <ListaTreas/>
    </main>
    </>
    
  );
}
