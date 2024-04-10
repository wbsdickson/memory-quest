import React, { Dispatch, SetStateAction, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { CertificateCard } from "@/components/certificate-card";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  score: string;
  resetAnswer: () => void;
}

const ResultModal = ({ open, setOpen, score, resetAnswer }: Props) => {
  const [isCertGenerated, setIsCertGenerated] = useState(false);
  const [userInfo, setUserIndo] = useState<Record<string, string>>({
    name: "",
    email: "",
  });

  const { width, height } = useWindowSize();

  const reset = () => {
    setIsCertGenerated(false);
    setUserIndo({
      name: "",
      email: "",
    });
  };

  const generateCertificate = () => {
    setIsCertGenerated(true);
  };

  return (
    <>
      <AlertDialog open={open}>
        <AlertDialogContent className="h-[600px] w-1/2 min-w-[500px] max-w-none rounded-md">
          {!isCertGenerated ? (
            <AnimatePresence mode="wait">
              <motion.div
                key="gameBar"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                <AlertDialogHeader>
                  <AlertDialogTitle>Congratulations</AlertDialogTitle>
                  <AlertDialogDescription>
                    You score {score} /100. You may now generate a certificate.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex h-[80%] flex-col justify-between py-4">
                  <div className="mt-4 grid gap-4">
                    <Input
                      placeholder="Name"
                      value={userInfo.name}
                      onChange={(e) =>
                        setUserIndo({ ...userInfo, name: e.target.value })
                      }
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={userInfo.email}
                      onChange={(e) =>
                        setUserIndo({ ...userInfo, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex justify-center gap-4">
                    <AlertDialogCancel
                      className="w-1/2"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="w-1/2"
                      onClick={generateCertificate}
                    >
                      Generate certificate
                    </AlertDialogAction>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                className="flex flex-col gap-4"
                key="gameBar"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                <AlertDialogTitle className="mb-4 text-center">
                  Certificate has been sent to your email
                </AlertDialogTitle>
                <CertificateCard score={score} name={userInfo.name} />
                <div className="flex justify-center gap-4">
                  <AlertDialogCancel
                    className="w-1/2"
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    Back to home
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="w-1/2"
                    onClick={() => {
                      reset();
                      resetAnswer();
                      setOpen(false);
                    }}
                  >
                    Play again
                  </AlertDialogAction>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </AlertDialogContent>
      </AlertDialog>
      {open && <Confetti width={width} height={height} />}
    </>
  );
};

export default ResultModal;
