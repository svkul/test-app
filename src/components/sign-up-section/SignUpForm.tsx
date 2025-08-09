"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { useTokenMutation } from "@/hooks/useTokenMutation";
import { type Position } from "@/types";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { FloatingInput } from "../ui/floatingInput";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { FileUpload } from "../ui/uploadInput";
import { formatPhoneNumber } from "@/lib/utils";

interface SignUpFormProps {
  positions: Position[];
  isToken: boolean;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(19, {
    message: "Invalid phone number.",
  }),
  position_id: z.number(),
  photo: z
    .custom<File>((file) => file instanceof File || file === undefined, {
      message: "File is required",
    })
    .refine((file) => file?.type.startsWith("image/"), {
      message: "Only image files are allowed",
    })
    .refine(
      (file) =>
        file?.size <=
        (process.env.NEXT_PUBLIC_MAX_FILE_SIZE
          ? +process.env.NEXT_PUBLIC_MAX_FILE_SIZE
          : 5) *
          1024 *
          1024,
      {
        message: `Photo must be less than ${process.env.NEXT_PUBLIC_MAX_FILE_SIZE} MB`,
      }
    ),
});

export const SignUpForm = ({ positions, isToken }: SignUpFormProps) => {
  const { mutate: getToken, isPending } = useTokenMutation();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position_id: positions[0]?.id,
      photo: undefined as unknown as File,
    },
    mode: "onChange",
  });

  const {
    formState: { isValid },
    setError,
  } = form;

  const { mutate: addNewUser, isPending: isPendingNewUser } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value as any);
      });

      const res = await fetch("/api/users", { method: "POST", body: formData });

      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setIsSuccess(true);
        form.reset();
        toast.success("User successfully registered");
      } else {
        if (data.fails) {
          Object.entries(data.fails).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              setError(field as keyof z.infer<typeof formSchema>, {
                type: "server",
                message: messages[0],
              });
            }
          });
        }
        toast.error(data.message);
      }
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    addNewUser({ ...values, phone: formatPhoneNumber(values.phone) });
  };

  const handleSignIn = () => {
    getToken();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[380px] w-full flex flex-col"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem className="mb-[50px]">
              <FormControl>
                <FloatingInput
                  className="w-full"
                  label="Your name"
                  req
                  error={!!fieldState.error}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem className="mb-[50px]">
              <FormControl>
                <FloatingInput
                  label="Email"
                  req
                  error={!!fieldState.error}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field, fieldState }) => (
            <FormItem className="mb-[25px] gap-1">
              <FormControl>
                <FloatingInput
                  label="Phone"
                  req
                  error={!!fieldState.error}
                  phone
                  {...field}
                />
              </FormControl>

              <FormDescription className="ml-4 p2">
                +38 (XXX) XXX - XX - XX
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="position_id"
          render={({ field }) => (
            <FormItem className="mb-[52px]">
              <FormLabel className="mb-[6px] p1">
                Select your position
              </FormLabel>

              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value as unknown as string}
                  className="flex flex-col"
                >
                  {positions.length === 0 ? (
                    <p className="p2">No awailable options</p>
                  ) : (
                    <>
                      {positions.map((position) => (
                        <FormItem
                          className="flex items-center gap-3"
                          key={position.id}
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={position.id as unknown as string}
                            />
                          </FormControl>

                          <FormLabel className="font-normal">
                            {position.name}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </>
                  )}
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="photo"
          render={({ field, fieldState }) => (
            <FormItem className="mb-[50px]">
              <FormControl>
                <FileUpload
                  label="Upload your photo"
                  req
                  error={!!fieldState.error}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {isToken ? (
          <Button
            className="text-foreground mx-auto"
            variant="yellow"
            size="yellow"
            type="submit"
            disabled={!isValid}
            isLoading={isPendingNewUser}
          >
            Add user
          </Button>
        ) : (
          <Button
            type="button"
            className="text-foreground mx-auto"
            variant="yellow"
            size="yellow"
            isLoading={isPending}
            onClick={handleSignIn}
          >
            Sign Up
          </Button>
        )}
      </form>
    </Form>
  );
};
