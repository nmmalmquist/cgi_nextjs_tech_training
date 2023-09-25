"use client";

import { GetServerSideProps } from "next";
import { useState, FormEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    name: string;
    email: string;
    message: string;
};

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<Inputs>();

    const [responseMessage, setResponseMessage] = useState("");

    const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
        const response = await fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify(inputs),
        });
        const data = await response.json();
        data?.message && setResponseMessage(data.message);
    };
    return (
        <form
            className="flex flex-col w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            {responseMessage && (
                <span className="text-center text-lg text-green-900 font-bold">
                    {responseMessage}
                </span>
            )}
            <label>Email: </label>
            <input
                className="border rounded my-2 p-1"
                placeholder="Email"
                {...register("email", {
                    required: {
                        value: true,
                        message: "Email is required"
                    },
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format",
                    },
                })}
            />
            {errors.email && (
                <span className="text-red-900">{errors.email.message}</span>
            )}
            <label>Name: </label>
            <input
                className="border rounded my-2 p-1"
                placeholder="Name"
                {...register("name", {
                    required: true,
                })}
            />
            {errors.name && (
                <span className="text-red-900">This field is required</span>
            )}
            <label>Message: </label>
            <textarea
                className="border rounded my-2 p-1"
                placeholder="Message"
                {...register("message", {
                    required: true,
                })}
            />
            {errors.message && (
                <span className="text-red-900">This field is required</span>
            )}

            <button className="bg-green-500 rounded p-4 text-white">
                Submit
            </button>
            <button
                type="button"
                className="bg-gray-500 rounded p-4 text-white mt-3"
                onClick={() => {
                    reset();
                    setResponseMessage("");
                }}
            >
                Reset
            </button>
        </form>
    );
};

export default ContactForm;
