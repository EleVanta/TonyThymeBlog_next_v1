"use client"

import SignIn from "../../components/form/SignIn";
import {useEffect, useState} from 'react'
import {getProviders} from "next-auth/react"

const Page = () => {
  const [providers, setProviders] = useState({});
  useEffect(()=>{
    getProviders().then((p)=>setProviders(p)).catch(()=>setProviders({}));
  },[])
  return (
    <div className="w-full h-full">
      <SignIn providers={providers}/>
    </div>
  );
}

export default Page;
