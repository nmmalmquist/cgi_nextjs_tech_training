import { GetServerSideProps } from "next";
import Image from "next/image";
import { useState } from "react";
import ContactForm from "./contactForm";

const AboutMe = () => {
    return (
        <main className="flex grid grid-cols-1 lg:grid-cols-2 h-full my-20">
            <div className="flex justify-center items-center">
                <Image
                    src="/malmquist-portrait.PNG"
                    alt="profile"
                    width={400}
                    height={200}
                />
            </div>
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-xl font-bold mb-5">
                    Nicholas M. Malmquist
                </h2>
                <p>
                    <span className="font-bold">College:</span> University of
                    Alabama
                </p>
                <p>
                    <span className="font-bold">Fun Fact:</span> I love to water
                    ski
                </p>
                <p>
                    <span className="font-bold">Time at CGI:</span> 3 months
                </p>
                <h3 className="mt-5 font-bold text-lg">Contact Me</h3>
                <div className="w-full max-w-[25rem]">
                    <ContactForm />
                </div>
            </div>
        </main>
    );
};

export default AboutMe;
