import React, { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WordPair } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const CookieManager = () => {
  const [wordPairs, setWordPairs] = useState<Array<WordPair>>([]);
  const [newWordPair, setNewWordPair] = useState({ eng: "", fr: "" });
  const [buttonText, setButtonText] = useState("Create");

  useEffect(() => {
    const cookieData = getCookie("word_pairs");
    if (cookieData) {
      setWordPairs(JSON.parse(cookieData));
    }
  }, []);

  const saveWordPairsToCookie = (pairs: any) => {
    setCookie("word_pairs", JSON.stringify(pairs));
  };

  const handleAddOrUpdatePair = () => {
    let isNewWord = true;
    const index = wordPairs.findIndex((pair) => pair.eng === newWordPair.eng);
    let updatedWordPairs = [...wordPairs];
    if (index > -1) {
      isNewWord = false;
      updatedWordPairs[index] = newWordPair;
    } else {
      updatedWordPairs.push(newWordPair);
    }
    setWordPairs(updatedWordPairs);
    saveWordPairsToCookie(updatedWordPairs);
    setNewWordPair({ eng: "", fr: "" });
    toast.success(isNewWord ? "New pair added" : `${updatedWordPairs[index].eng} is updated`);
    setButtonText("Create");
  };

  const handleDeletePair = (eng: string) => {
    const updatedWordPairs = wordPairs.filter((pair) => pair.eng !== eng);
    if (updatedWordPairs.length < 20) {
      toast.error("Word pairs count cannot be lower than 20");
      return;
    }
    setWordPairs(updatedWordPairs);
    saveWordPairsToCookie(updatedWordPairs);
  };

  const handleEditPair = (eng: string) => {
    const index = wordPairs.findIndex((pair) => pair.eng === eng);
    setNewWordPair({
      eng: wordPairs[index].eng,
      fr: wordPairs[index].fr
    });
    setButtonText("Update");
  };

  return (
    <>
      <div className="space-y-4 p-4">
        <div className="text-sm text-muted-foreground">Word pairs Count: {wordPairs.length}</div>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          {wordPairs.map((pair, index) => (
            <div key={index} className="flex items-center justify-between px-2">
              <span>{pair.eng} - {pair.fr}</span>
              <div>
                <Button variant="ghost" size="icon" className="rounded-md p-3"
                        onClick={() => handleEditPair(pair.eng)}>
                  <Pencil />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-md p-3"
                        onClick={() => handleDeletePair(pair.eng)}>
                  <Trash2 />
                </Button>
              </div>

            </div>
          ))}
        </ScrollArea>
        <div className="gap-2 flex">
          <Input placeholder="English" value={newWordPair.eng}
                 onChange={(e) => setNewWordPair({ ...newWordPair, eng: e.target.value })} />
          <Input placeholder="French" value={newWordPair.fr}
                 onChange={(e) => setNewWordPair({ ...newWordPair, fr: e.target.value })} />
          <Button onClick={handleAddOrUpdatePair}>{buttonText}</Button>
        </div>
      </div>
    </>
  );
};

export default CookieManager;
