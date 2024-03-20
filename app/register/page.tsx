"use client";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const Index = () => {
  const router = useRouter();
  const formSchame = z.object({
    email: z.string().email({
      message: "Please type emial address.",
    }),
    password: z
      .string()
      .min(6, { message: "Enter at least 6 characters" })
      .max(16, { message: "Enter at least 16 characters" }),
  });
  const loginForm = useForm<z.infer<typeof formSchame>>({
    resolver: zodResolver(formSchame),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchame>) => {
    const ret = await fetch("/api/auth/createUser", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (ret.ok) {
      const { id, status } = await ret.json();
      if (id && status === 200) {
        router.replace("/login");
      }
    }
  };

  const onBack = () => {};

  return (
    <div>
      <div className="my-4 mx-6">
        <Button size={"sm"} className="space-x-2" onClick={onBack}>
          <ArrowLeftIcon /> <div>BACK</div>
        </Button>
      </div>
      <div className="flex min-h-screen flex-col items-center p-36">
        <p>Register</p>
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onSubmit)}
            onReset={() => loginForm.reset()}
          >
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-2">
                    <Label className="text-sm">Username</Label>
                    <FormControl>
                      <Input placeholder="Email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col w-80 my-6 space-y-2">
                    <div className="space-y-2">
                      <Label>Password</Label>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                );
              }}
            />
            <Button type="submit">Login</Button>
            <Button type="reset" variant={"link"}>
              Reset
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Index;
