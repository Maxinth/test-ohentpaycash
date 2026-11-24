"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Status = "idle" | "sending" | "sent" | "error";

interface Props {
  headingText?: string;
  variant?: "agent" | "contact";
}

const contactSchema = z.object({
  full_name: z.string().trim().min(2, "Please add your full name."),
  email: z
    .string()
    .trim()
    .min(1, "Please add your email address.")
    .email("That email address does not look quite right."),
  subject: z.enum(["Partnership", "Sales", "General Enquiries"]),
  job_title: z.string().trim().optional(),
  business_name: z.string().trim().optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please add a little more detail—at least 10 characters."),
});

export default function AgentForm({ headingText, variant = "agent" }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const contactForm = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      full_name: "",
      email: "",
      subject: "Partnership",
      job_title: "",
      business_name: "",
      message: "",
    },
  });

  async function submit(data: Record<string, unknown>) {
    setStatus("sending");
    try {
      const department =
        data.subject === "Sales"
          ? "CASH_SALES"
          : data.subject === "General Enquiries"
            ? "CASH_GENERAL"
            : "CASH_PARTNERS";

      const payload = { ...data, department };
      const res = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <Alert className="border-emerald-500 bg-emerald-50 p-8">
        <AlertTitle className="text-2xl text-emerald-800">
          {variant === "agent" ? "Application received" : "Message sent"}
        </AlertTitle>
        <AlertDescription className="mt-2 text-emerald-700">
          {variant === "agent"
            ? "We will call you within two working days to arrange a shop visit."
            : "Thank you. A member of our team will respond soon."}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Form {...contactForm}>
      <form
        onSubmit={contactForm.handleSubmit((data) => submit(data))}
        className="space-y-5 rounded-lg bg-white p-6 shadow-sm md:p-8"
      >
        <h2 className="text-2xl font-bold">
          {headingText ??
            (variant === "agent"
              ? "Apply to become an agent"
              : "Get in touch with us")}
        </h2>
        {variant === "agent" && (
          <p className="text-sm text-ink/70">
            Tell us about your business and our partnerships team will follow
            up.
          </p>
        )}
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={contactForm.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="name"
                    placeholder="Enter your name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={contactForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={contactForm.control}
            name="business_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company name</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="organization"
                    placeholder="Enter your company name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={contactForm.control}
            name="job_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job title</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="organization-title"
                    placeholder="Enter your job title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={contactForm.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={variant === "agent" ? "Partnership" : field.value}
                disabled={variant === "agent"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Partnership">Partnership</SelectItem>
                  {variant === "contact" && (
                    <>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="General Enquiries">
                        General enquiries
                      </SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={contactForm.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea rows={5} placeholder="How can we help?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton
          status={status}
          label={variant === "agent" ? "Submit application" : "Send message"}
        />
      </form>
    </Form>
  );
}

function SubmitButton({ status, label }: { status: Status; label: string }) {
  return (
    <>
      <Button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-6"
      >
        {status === "sending" ? "Sending…" : label}
      </Button>
      {status === "error" && (
        <p role="alert" className="text-sm text-red-700">
          Your message did not send. Check your connection and try again.
        </p>
      )}
    </>
  );
}
