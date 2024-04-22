import { IoSearch } from "react-icons/io5";
import Input from "./Form/Input";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { easeInOut, motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import AppContext from "../contexts/AppContext";

function Search() {
  const [search, setSearch] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const { setShowSearchModal } = useContext(AppContext);
  const redirect = useNavigate();

  useEffect(() => {
    search.trim() ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [search]);

  function handleSubmit(e) {
    e.preventDefault();
    if(!search.trim()) return;
    setShowSearchModal(false);
    redirect(`/search?q=${search}`);
  }

  return (
    <motion.div animate={{ top:0 }} transition={{ duration:.3, ease: easeInOut }} className="fixed inset-0 top-full z-20 bg-white flex pt-24 items-center justify-start flex-col">
      <button className="text-xl absolute top-6 right-6 opacity-70" onClick={() => setShowSearchModal(false)}><MdClose /></button>
      <form action="/search" method="get" className="flex w-full max-w-[240px] h-[47px] relative" onSubmit={(e) => handleSubmit(e)}>
        <Input
          type="text"
          name="search"
          value={search}
          setValue={setSearch}
          placeholder="Search..."
          className="w-full text-md"
        />
        <button className="absolute top-1/2 right-1 -translate-y-1/2 disabled:opacity-40" disabled={submitDisabled}><IoSearch size={20} /></button>
      </form>
    </motion.div>
  )

}

export default Search