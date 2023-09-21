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
        reset
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
            <input
                className="border rounded m-2"
                placeholder="Email"
                {...register("email", {
                    required: true,
                })}
            />
            {errors.email && (
                <span className="text-red-900">This field is required</span>
            )}
            <input
                className="border rounded m-2"
                placeholder="Name"
                {...register("name", {
                    required: true,
                })}
            />
            {errors.name && (
                <span className="text-red-900">This field is required</span>
            )}
            <textarea
                className="border rounded m-2"
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
                    reset()
                    setResponseMessage("");
                }}
            >
                Reset
            </button>
        </form>
    );
};

export default ContactForm;
