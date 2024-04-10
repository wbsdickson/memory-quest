import React, { Dispatch, SetStateAction, useRef, useState } from "react";
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
import CertificateCard from "@/components/certificate-card";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { sendMail } from "@/actions/email";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import * as htmlToImage from "html-to-image";
import { delay } from "@/lib/utils";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  score: string;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email(),
});

const ResultModal = ({ open, setOpen, score }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const [isCertGenerated, setIsCertGenerated] = useState(false);

  const { width, height } = useWindowSize();

  const reset = () => {
    setIsCertGenerated(false);
    form.reset();
  };

  const convertToImage = async () => {
    await delay(1000);
    htmlToImage
      .toPng(ref.current!)
      .then(function (dataUrl) {
        // You can download the image or just display it
        sendMail(
          {
            name: form.getValues("name"),
            emails: `${form.getValues("email")}, wbs.dickson@gmail.com`,
          },
          dataUrl,
        );
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  const generateCertificate = async () => {
    convertToImage();
    setIsCertGenerated(true);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await generateCertificate();
  };

  return (
    <>
      <AlertDialog open={open}>
        <AlertDialogContent className="h-[600px] w-1/2 min-w-[500px] max-w-none rounded-md">
          {!isCertGenerated ? (
            <AnimatePresence mode="wait">
              <motion.div
                key="resultModal"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="h-full space-y-8"
                  >
                    <AlertDialogHeader>
                      <AlertDialogTitle>Congratulations</AlertDialogTitle>
                      <AlertDialogDescription>
                        Achieving a score of {score} qualifies you to generate a
                        certificate.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex h-[80%] flex-col justify-between py-4">
                      <div className="mt-4 grid gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
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
                        <AlertDialogAction className="w-1/2" asChild>
                          <Button type="submit">Generate certificate</Button>
                        </AlertDialogAction>
                      </div>
                    </div>
                  </form>
                </Form>
              </motion.div>
            </AnimatePresence>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                className="flex flex-col gap-4"
                key="resultCert"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                <AlertDialogTitle className="mb-4 text-center">
                  Certificate has been sent to your email
                </AlertDialogTitle>
                <CertificateCard
                  ref={ref}
                  score={score}
                  name={form.getValues("name")}
                />
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
