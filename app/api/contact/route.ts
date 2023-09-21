import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: Request) {
    const data: { name: string; message: string; email: string } =
        await req.json();
    console.log(data);
    return NextResponse.json({ message: "Sent" });
}
