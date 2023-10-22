"use client"

import { useEffect, useState } from "react";



export default function Home() {
  const [thePrompt, setThePrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState("");



  const generateImage = async () => {
    setIsLoading(true);
    if (!thePrompt) {
      setIsLoading(false);
      return;
    }

    try {
      const modifiedPrompt = `Generate a full-body 3D animated image of the following description:${thePrompt}`;
      const response = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({ prompt: modifiedPrompt })
      });

      if (response.ok) {
        

        console.log("Image generated successfully");
        const blob= await response.blob()

        const imageUrl = URL.createObjectURL(blob)
        console.log(imageUrl)
        
        console.log(blob)
        setApiResponse(imageUrl);
        setIsLoading(false);
      } else {
        console.error("Failed to generate image");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error occurred during API call:", error);
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen bg-gray-900 flex-col items-center justify-between px-24 py-12">
      <h1 className=" text-5xl mb-4">Furverse Avatar Generator</h1>
      <div className="mb-4">
        Write a well defined text prompt to generate your own AI-based Pet avatar</div>
        <div>
      <input
        type="text"
        style={{ width: "700px", height: "50px" }}
        className="border p-1 text-black rounded-sm border-gray-600"
        onChange={(event)=>{
          setThePrompt(event.target.value)
         }}
      />
            
        <button
          className="bg-blue-600 px-5 py-1 ml-2 h-max rounded-sm disabled:cursor-not-allowed disabled:bg-blue-900 transition-colors"
          style={{ width: "100px", height: "50px" }}
          onClick={generateImage}
          disabled={isLoading||!thePrompt}
        >Go! </button>
      
      </div>
      <div className="w-80 h-80 relative placeholderdiv">
         {apiResponse?<img src={apiResponse}/>:""}
      </div>


    </main>
  );
}
