"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

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

import { FloatingInput } from "./ui/floatingInput";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { FileUpload } from "./ui/uploadInput";

const positionTypes = ["frontend", "backend", "designer", "qa"];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(19, {
    message: "Invalid phone number.",
  }),
  position: z.enum(positionTypes, {
    message: "Select a valid position.",
  }),
  photo: z.any(),
});

export const SignUpForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: "frontend",
      photo: "",
    },
  });

  const {
    formState: { isValid },
  } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-[380px] w-full flex flex-col"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <FloatingInput
                  className="w-full"
                  label="Your name"
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
            <FormItem>
              <FormControl>
                <FloatingInput
                  label="Email"
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
            <FormItem>
              <FormControl>
                <FloatingInput
                  label="Phone"
                  error={!!fieldState.error}
                  phone
                  {...field}
                />
              </FormControl>
              <FormDescription className="ml-4 p2">
                +38 (XXX) XXX-XX-XX
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2">Select your position</FormLabel>

              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col"
                >
                  {positionTypes.map((item) => (
                    <FormItem className="flex items-center gap-3" key={item}>
                      <FormControl>
                        <RadioGroupItem value={item} />
                      </FormControl>

                      <FormLabel className="font-normal">{item}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FileUpload label="Upload your photo" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="mx-auto"
          type="submit"
          variant="yellow"
          size="yellow"
          disabled={!isValid}
        >
          Sign up
        </Button>
      </form>
    </Form>
  );
};
