import Container from "@components/container";
import Layout from "@components/layout";
import { getClient } from "@lib/sanity";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "use-web3forms";
import { configQuery, menuQuery } from "@lib/groq";

export default function Contact({ siteconfig, menu }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm({
    mode: "onTouched"
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(false);
  // Please update the Access Key in the Sanity CMS - Site Congig Page
  const apiKey = siteconfig?.w3ckey || "YOUR_ACCESS_KEY_HERE";

  const { submit: onSubmit } = useWeb3Forms({
    apikey: apiKey,
    from_name: "Putty Template",
    subject: "New Contact Message from Putty Website",
    onSuccess: (msg, data) => {
      setIsSuccess(true);
      setMessage(msg);
      reset();
    },
    onError: (msg, data) => {
      setIsSuccess(false);
      setMessage(msg);
    }
  });
  return (
    <Layout {...siteconfig} menu={menu}>
      <Container>
        <h1>Contact</h1>
        <div>
          <p>We are a here to help.</p>
        </div>

        <div>
          <div>
            <h2>Contact Putty</h2>
            <p>
              Have something to say? We are here to help. Fill up the
              form or send email or call phone.
            </p>

            <div>
              <div>
                <span>1734 Sanfransico, CA 93063</span>
              </div>
              {siteconfig?.email && (
                <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
                  <a href={`mailto:${siteconfig.email}`}>
                    {siteconfig.email}
                  </a>
                </div>
              )}
              {siteconfig?.phone && (
                <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
                  <a href={`tel:${siteconfig.phone}`}>
                    {siteconfig.phone}
                  </a>
                </div>
              )}
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="checkbox"
                id=""
                className="hidden"
                style={{ display: "none" }}
                {...register("botcheck")}></input>

              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  autoComplete="false"
                  className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900   focus:ring-4  ${
                    errors.name
                      ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                      : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                  }`}
                  {...register("name", {
                    required: "Full name is required",
                    maxLength: 80
                  })}
                />
                {errors.name && (
                  <div className="mt-1 text-red-600">
                    <small>{errors.name.message}</small>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="email_address" className="sr-only">
                  Email Address
                </label>
                <input
                  id="email_address"
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  autoComplete="false"
                  className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900   focus:ring-4  ${
                    errors.email
                      ? "border-red-600 focus:border-red-600 ring-red-100 dark:ring-0"
                      : "border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0"
                  }`}
                  {...register("email", {
                    required: "Enter your email",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Please enter a valid email"
                    }
                  })}
                />
                {errors.email && (
                  <div>
                    <small>{errors.email.message}</small>
                  </div>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  className={` ${errors.message ? "true" : "false"}`}
                  {...register("message", {
                    required: "Enter your Message"
                  })}
                />
                {errors.message && (
                  <div>
                    {" "}
                    <small>{errors.message.message}</small>
                  </div>
                )}
              </div>

              <button type="submit">
                {isSubmitting ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>

            {isSubmitSuccessful && isSuccess && (
              <div>
                {message || "Success. Message sent successfully"}
              </div>
            )}
            {isSubmitSuccessful && !isSuccess && (
              <div>
                {message || "Something went wrong. Please try later."}
              </div>
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const config = await getClient(preview).fetch(configQuery);
  const menu = await getClient(preview).fetch(menuQuery);

  return {
    props: {
      siteconfig: { ...config },
      menu: menu.menuItem,
      preview
    },
    revalidate: 100
  };
}
