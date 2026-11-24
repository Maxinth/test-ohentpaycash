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

const agentSchema = z.object({
  name: z.string().trim().min(2, "Please add your full name."),
  email: z
    .string()
    .trim()
    .min(1, "Please add your email address.")
    .email("That email address does not look quite right."),
  business: z.string().trim().min(2, "Please add the name of your business."),
  phone: z
    .string()
    .trim()
    .min(7, "Please add a phone number with at least 7 digits.")
    .regex(/^\+?[0-9 ()-]{7,20}$/, "Please use a valid phone number."),
  area: z.string().trim().min(3, "Please tell us the shop address or area."),
  type: z.enum([
    "Retail shop",
    "Pharmacy",
    "POS / banking agent",
    "Supermarket",
    "Other",
  ]),
  message: z
    .string()
    .trim()
    .max(1000, "Please keep the extra details under 1000 characters.")
    .optional(),
});

const contactSchema = z.object({
  full_name: z.string().trim().min(2, "Please add your full name."),
  email: z
    .string()
    .trim()
    .min(1, "Please add your email address.")
    .email("That email address does not look quite right."),
  subject: z.enum([
    "General Enquiry",
    "Sales",
    "Account Support",
    "Marketing and Partnerships",
    "Media and Public Relations",
  ]),
  job_title: z.string().trim().optional(),
  business_name: z.string().trim().optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please add a little more detail—at least 10 characters."),
});

export default function AgentForm({ headingText, variant = "agent" }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const agentForm = useForm<z.infer<typeof agentSchema>>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      name: "",
      email: "",
      business: "",
      phone: "",
      area: "",
      type: "Retail shop",
      message: "",
    },
  });
  const contactForm = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      full_name: "",
      email: "",
      subject: "General Enquiry",
      job_title: "",
      business_name: "",
      message: "",
    },
  });

  async function submit(data: Record<string, unknown>) {
    setStatus("sending");
    try {
      const endpoint = variant === "agent" ? "/api/agents" : "/api/contact";
      const payload =
        variant === "contact"
          ? {
              ...data,
              department:
                data.subject === "Sales"
                  ? "SALES"
                  : data.subject === "Marketing and Partnerships" ||
                      data.subject === "Media and Public Relations"
                    ? "MARKETING"
                    : "SUPPORT",
            }
          : data;
      const res = await fetch(endpoint, {
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

  if (variant === "contact") {
    return (
      <Form {...contactForm}>
        <form
          onSubmit={contactForm.handleSubmit((data) => submit(data))}
          className="space-y-5 rounded-lg bg-white p-6 shadow-sm md:p-8"
        >
          <h2 className="text-2xl font-bold">
            {headingText ?? "Get in touch with us"}
          </h2>
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
                  <FormLabel>Company Name</FormLabel>
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
                  <FormLabel>Job Title</FormLabel>
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
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="General Enquiry">
                      General enquiry
                    </SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Account Support">
                      Account Support
                    </SelectItem>
                    <SelectItem value="Marketing and Partnerships">
                      Marketing and partnerships
                    </SelectItem>
                    <SelectItem value="Media and Public Relations">
                      Media and Public Relations
                    </SelectItem>
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
                  <Textarea
                    rows={5}
                    placeholder="How can we help?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton status={status} label="Send message" />
        </form>
      </Form>
    );
  }

  return (
    <Form {...agentForm}>
      <form
        onSubmit={agentForm.handleSubmit((data) => submit(data))}
        className="space-y-5 rounded-lg bg-white p-6 shadow-sm md:p-8"
      >
        <h2 className="text-2xl font-bold">
          {headingText ?? "Apply to become an agent"}
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={agentForm.control}
            name="name"
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
            control={agentForm.control}
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
          <FormField
            control={agentForm.control}
            name="business"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business name</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="organization"
                    placeholder="Enter business name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={agentForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    autoComplete="tel"
                    placeholder="e.g. +1 555 123 4567"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={agentForm.control}
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shop address or area</FormLabel>
              <FormControl>
                <Input placeholder="Street, city or postcode" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={agentForm.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of business</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Retail shop">Retail shop</SelectItem>
                  <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                  <SelectItem value="POS / banking agent">
                    POS / banking agent
                  </SelectItem>
                  <SelectItem value="Supermarket">Supermarket</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={agentForm.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Anything else we should know?{" "}
                <span className="text-ink/50">(optional)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Tell us about your shop"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton status={status} label="Submit application" />
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
