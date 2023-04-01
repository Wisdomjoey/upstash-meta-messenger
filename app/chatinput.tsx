"use client";

import { Message } from "@/typings";
import { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import useSWR from "swr";
import fetcher from "@/utils/fetchMessages";

function ChatInput() {
	const [input, setinput] = useState("");
	const { data: messages, error, mutate } = useSWR("api/getMessages", fetcher);

	const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!input) return;

		const text = input;

		setinput("");

		const id = uuid();
		const message: Message = {
			id,
			message: text,
			created_at: Date.now(),
			username: "Jay Z",
			profile_pic: "",
			email: "",
		};

		const upload = async () => {
			const data = await fetch("/api/addMessage", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message,
				}),
			}).then(res => res.json());

			return [data.message, ...messages!];
		};

		await mutate(upload, {
			optimisticData: [message, ...messages!],
			rollbackOnError: true
		});
	};

	return (
		<form
			onSubmit={sendMessage}
			className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t bg-white border-gray-100"
		>
			<input
				value={input}
				onChange={(e) => setinput(e.target.value)}
				type="text"
				placeholder="Enter message..."
				className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
			/>
			<button
				type="submit"
				disabled={!input}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Send
			</button>
		</form>
	);
}

export default ChatInput;
