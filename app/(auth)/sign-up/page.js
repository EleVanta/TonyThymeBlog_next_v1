"use client"

import SignUp from "../../components/form/SignUp";
import {useEffect, useState} from 'react'
import {getProviders} from "next-auth/react"

const Page = () => {
  const [providers, setProviders] = useState({});
  useEffect(()=>{
    getProviders().then((p)=>setProviders(p)).catch(()=>setProviders({}));
  },[])
  return (
    <div className="w-full h-full">
      <SignUp/>
    </div>
  );
}

export default Page;
